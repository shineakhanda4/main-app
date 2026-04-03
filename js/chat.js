var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();

(function(){
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    // Your specific property tokens
    s1.src = 'https://embed.tawk.to/69cf219fced0971c348cb60e/1jl8hmm52';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();

// This ensures the custom button only works once the API is actually ready
Tawk_API.onLoad = function(){
    console.log("Tawk.to is ready!"); 
    Tawk_API.hideWidget();
};
