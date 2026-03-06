import fs from 'node:fs';
import path from 'node:path';

function pad2(n) {
    return String(n).padStart(2, '0');
}

const now = new Date();
const yyyy = now.getFullYear();
const MM = pad2(now.getMonth() + 1);
const dd = pad2(now.getDate());
const hh = pad2(now.getHours());
const mm = pad2(now.getMinutes());

const filename = `${yyyy}-${MM}-${dd}-${hh}${mm}.md`;
const dir = path.join(process.cwd(), 'src', 'content', 'essay');
const filepath = path.join(dir, filename);

if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

if (fs.existsSync(filepath)) {
    console.error(`File already exists: ${filepath}`);
    process.exit(1);
}

const date = `${yyyy}-${MM}-${dd}`;

const template = `---
title: "新文章标题"
description: "文章内容简介..."
date: ${date}
badge: "原创"
tags: ["标签1", "标签2"]
draft: true
---

这里可以写一段前言或者引言，它会在文章列表页作为预览摘要显示。

<!-- more -->

正文内容...
`;

fs.writeFileSync(filepath, template, 'utf8');

console.log(`Created: ${filepath}`);
console.log('Next: edit the file and run `npm run dev`');
