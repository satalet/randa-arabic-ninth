#!/bin/bash
# سكربت الرفع وتحديث الكاش

# توليد رقم جديد بناءً على الوقت الحالي
NEW_VERSION=$(date +%s)

# زرع الرقم الجديد جوا ملف sw.js
sed -i "s/const CACHE_VERSION = .*/const CACHE_VERSION = '${NEW_VERSION}';/" sw.js

# رفع الملفات
git add .
MSG=${1:-"تحديث المنصة وإضافة مواد جديدة"}
git commit -m "$MSG"
git push origin main

echo "🚀 تم الرفع بنجاح! رقم الإصدار الجديد هو: $NEW_VERSION"
