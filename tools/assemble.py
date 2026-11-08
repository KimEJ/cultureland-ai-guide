import base64, os, re, subprocess, sys
OUT = sys.argv[1]
parts = []
for i in range(1, 10):
    lines = open(f"scene{i}.txt").read().splitlines()
    fr = [l.split(":", 2) for l in lines if l.startswith("F:")]
    end = int(re.search(r"^END:(\d+)", "\n".join(lines), re.M).group(1))
    d = f"sc{i}"; os.makedirs(d, exist_ok=True)
    lst = []
    for k, (_, ts, b) in enumerate(fr):
        fn = f"{d}/{k:05d}.jpg"; open(fn, "wb").write(base64.b64decode(b)); lst.append((fn, int(ts)))
    with open(f"{d}/list.txt", "w") as f:
        for k, (fn, ts) in enumerate(lst):
            nxt = lst[k + 1][1] if k + 1 < len(lst) else end
            f.write(f"file '{os.path.abspath(fn)}'\nduration {max(nxt - ts, 1) / 1000:.3f}\n")
        f.write(f"file '{os.path.abspath(lst[-1][0])}'\n")
    L = end / 1000
    out = f"{d}.mp4"
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", f"{d}/list.txt", "-i", f"s{i}.aiff",
        "-filter_complex", f"[0:v]crop=780:1688:1050:56,scale=-2:1760,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=0xd9dce1,fps=30,format=yuv420p[v];[1:a]adelay=500|500,apad,atrim=0:{L:.3f},aresample=48000[a]",
        "-map", "[v]", "-map", "[a]", "-t", f"{L:.3f}", "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-c:a", "aac", "-b:a", "160k", "-ac", "2", out], check=True)
    parts.append(out); print(i, f"{L:.1f}s", len(lst), "frames")
open("parts.txt", "w").write("".join(f"file '{os.path.abspath(p)}'\n" for p in parts))
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", "parts.txt", "-c", "copy", "-movflags", "+faststart", OUT], check=True)
print(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration,size", "-of", "csv=p=0", OUT]).decode().strip())
