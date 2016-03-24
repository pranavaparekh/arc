
(function() {

    var disqus_config = function () {
        this.page.url = pageUrl;  // Replace PAGE_URL with your page's canonical URL variable
        this.page.identifier = pageId; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };

    var d = document, s = d.createElement('script');

    s.src = '//aranca.disqus.com/embed.js';

    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
})();
