'use strict';

jQuery(document).ready(function ($) {
  var blogFeedUrl = 'http://therefore.ca/blog/latest.json';

  // $.ajax({
  //   dataType: "json",
  //   url: blogFeedUrl,
  //   error: function (event, jqXHR, ajaxSettings, thrownError) {
  //     console.warn(thrownError);
  //   },
  //   success: handleBlogJson
  // });

  function handleBlogJson(data) {
    console.log('blog data', data);
    if (data && data.posts) {
      var posts = data.posts;

      var blogTeasers = $("#home-blog-teasers article.teaser.card");

      $.each(posts, function (i, post) {
        var date = moment(post.date);
        var teaser = blogTeasers.eq(i);

        console.log('digesting post',post, teaser);

        teaser.find('img').attr('src', post.author.img);
        teaser.find('h1').text(post.title);

        teaser.find('p.author').html("By " + post.author.name + ", <time pubdate datetime='" + date.format('YYYY-MM-DD') + "'>" + date.format('MMMM Mo, YYYY') + "</time>");

        teaser.find('p:not(.author)').html(post.excerpt);

        teaser.find('a').attr('href', post.uri);
        teaser.find('a').attr('alt', post.title);
      });

      /*
      {
      title: "Welcome to Ghost",
      tag: "Getting Started",
      excerpt: "You&apos;re live! Nice. We&apos;ve put together a little post to introduce you to the Ghost editor and get you started. You can manage your content by signing in to the admin area at &lt;your blog URL&gt;/ghost/. When you arrive, you can select this post from a list on&#x2026;",
      author: {
      url: "http://therefore.ca/blog/author/therefore/",
      name: "Therefore Blog Admin",
      img: "//www.gravatar.com/avatar/1557ec68b1fd4fbbc75a6c52bdc06dd9?s=250&d=mm&r=x"
      },
      uri: "http://therefore.ca/blog/welcome-to-ghost/",
      date: "2015-11-02T05:00:00.000Z"
      }

      <article class = "teaser card">
        <img alt = "" class = "person" src = "images/people-alex.jpg">
        <h1>Drupal North 2015</h1>
        <p class = "author">By Alex De Winne, <time pubdate datetime="2015-06-28">June 28, 2015</time></p>
        <p>The first annual Drupal North regional summit in Toronto is wrapping up this weekend. We showed our support for the community by being Gold Sponsors.</p>
        <a href="drupal-north-2015.html" class="btn btn-default btn-sm" alt="Drupal North 2015">Read more
          <div class="ripple-wrapper"></div>
        </a>
      </article>
       */
    }
  }
});
