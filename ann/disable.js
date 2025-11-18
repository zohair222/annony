// JavaScript لتعطيل أدوات المطور (DevTools) ومنع فحص العناصر
// يتم تحويل المستخدم إلى صفحة Google عند محاولة فتح أدوات المطور.

const redirectUrl = 'https://www.google.com';

// 1. منع النقر بزر الفأرة الأيمن لمنع ظهور قائمة السياق (Inspect Element)
document.addEventListener('contextmenu', e => {
    e.preventDefault();
});

// 2. منع الاختصارات الشائعة لفتح أدوات المطور وعرض المصدر
document.onkeydown = function(e) {
    // F12
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }

    // Ctrl+Shift+I (لفتح أدوات المطور)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
    }

    // Ctrl+Shift+J (لفتح الكونسول مباشرة)
    if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+C (لفتح مفحص العناصر - Element Inspector)
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        return false;
    }

    // Ctrl+U (لعرض مصدر الصفحة - View Source)
    if (e.ctrlKey && e.key === 'U') {
        e.preventDefault();
        return false;
    }
};

// 3. آلية الكشف عن فتح أدوات المطور (DevTools Detection)
let devToolsOpen = false;

function checkDevTools() {
    const threshold = 160; // حجم افتراضي تتبدل عنده الأبعاد عند فتح الأدوات

    // الكشف باستخدام الأبعاد (طريقة شائعة للكشف)
    if (window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold) {
        
        if (!devToolsOpen) {
            devToolsOpen = true;
            // التحويل الفوري إلى Google
            window.location.replace(redirectUrl); 
        }
    } else {
        devToolsOpen = false;
    }
}

// تشغيل الفحص كل 200 مللي ثانية (للكشف الأسرع)
setInterval(checkDevTools, 200);

// ملاحظة: لدمج هذا الملف في ملف HTML، يجب عليك إضافته
// باستخدام وسم <script> مع خاصية src، مثل:
// <script src="disable.js"></script>