#!/usr/bin/env python3
"""
JRE Nightly Deploy Script
Pushes updated episodes.json + search-index.json to GitHub and triggers Vercel deploy.
Designed to be called by the ClawTeam deployer agent.
"""

import base64
import json
import os
import subprocess
import urllib.request
import urllib.error

REPO = "theoknox77/jre-blog"
BASE = f"https://api.github.com/repos/{REPO}"
VERCEL_TOKEN = "vca_2MfztGX5hr0zp4PPZzAhX0Q6XXzhcXqZ0uizXZwqSB1Ss73ufR0hQKpP"
VERCEL_TEAM = "team_jQ6iqTVkOFxJ6NNMOh7qvAI1"
VERCEL_PROJECT = "prj_UejdGXw6z46L0UDzWBkjTD0LLgq1"
WORKSPACE = "/Users/theoknox/workspace/jre-blog"

def get_token():
    return subprocess.check_output(["gh", "auth", "token"]).decode().strip()

def gh_get(path, token):
    req = urllib.request.Request(
        f"{BASE}/{path}",
        headers={"Authorization": f"Bearer {token}", "Accept": "application/vnd.github+json"}
    )
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read())

def gh_put(path, token, message, content_bytes, sha=None):
    payload = {"message": message, "content": base64.b64encode(content_bytes).decode()}
    if sha:
        payload["sha"] = sha
    req = urllib.request.Request(
        f"{BASE}/{path}",
        data=json.dumps(payload).encode(),
        method="PUT",
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "Accept": "application/vnd.github+json"
        }
    )
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read()), None
    except urllib.error.HTTPError as e:
        return None, json.loads(e.read())

def strip_transcripts():
    path = os.path.join(WORKSPACE, "data/episodes.json")
    with open(path) as f:
        eps = json.load(f)
    stripped = sum(1 for ep in eps if ep.pop("transcript", None) is not None)
    with open(path, "w") as f:
        json.dump(eps, f, separators=(",", ":"))
    size = os.path.getsize(path) / 1024 / 1024
    print(f"Stripped {stripped} transcripts from episodes.json ({size:.1f}MB)")
    return path

def push_file(gh_path, local_path, token, message):
    current = gh_get(f"contents/{gh_path}", token)
    sha = current["sha"]
    with open(local_path, "rb") as f:
        content = f.read()
    result, err = gh_put(f"contents/{gh_path}", token, message, content, sha)
    if err:
        print(f"ERROR pushing {gh_path}: {err.get('message', err)}")
        return False
    print(f"Pushed {gh_path}: {result['commit']['sha'][:7]}")
    return True

def trigger_deploy(token):
    current = gh_get("contents/README.md", token)
    sha = current["sha"]
    content = base64.b64decode(current["content"]).decode().rstrip() + "\n"
    result, err = gh_put("contents/README.md", token, "Nightly deploy: update episodes + transcripts + search index", content.encode(), sha)
    if err:
        print(f"ERROR triggering deploy: {err.get('message', err)}")
        return False
    print(f"Deploy triggered: {result['commit']['sha'][:7]}")
    return True

def check_vercel_status():
    req = urllib.request.Request(
        f"https://api.vercel.com/v6/deployments?teamId={VERCEL_TEAM}&projectId={VERCEL_PROJECT}&limit=1",
        headers={"Authorization": f"Bearer {VERCEL_TOKEN}"}
    )
    with urllib.request.urlopen(req) as r:
        data = json.loads(r.read())
    deps = data.get("deployments", [])
    if deps:
        state = deps[0].get("state", "?")
        msg = deps[0].get("meta", {}).get("githubCommitMessage", "")[:50]
        print(f"Vercel: {state} — {msg}")
        return state
    return "unknown"

def main():
    print("=== JRE Nightly Deploy ===")
    token = get_token()

    # Step 1: Strip transcripts from episodes.json
    episodes_path = strip_transcripts()

    # Step 2: Push episodes.json
    push_file("data/episodes.json", episodes_path, token, "Nightly: update episodes.json")

    # Step 3: Push search-index.json
    search_path = os.path.join(WORKSPACE, "public/search-index.json")
    if os.path.exists(search_path):
        push_file("public/search-index.json", search_path, token, "Nightly: update search-index.json")
    else:
        print("search-index.json not found, skipping")

    # Step 4: Trigger Vercel deploy
    trigger_deploy(token)

    # Step 5: Check status
    import time
    print("Waiting 20s for Vercel to queue...")
    time.sleep(20)
    check_vercel_status()

    print("=== Deploy complete ===")

if __name__ == "__main__":
    main()
