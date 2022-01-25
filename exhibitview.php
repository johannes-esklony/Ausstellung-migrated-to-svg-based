<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">

    <title><?php echo($_GET['target']) ?></title>
</head>
<body id="main_view">
    <div id="content">
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam itaque veritatis voluptate minima. Fugiat vero ab id non amet, voluptas esse quam, commodi natus temporibus tempore laborum quae, mollitia dolorum.</p>
        <p>Sint labore omnis unde et minima quam quisquam natus repudiandae ullam tempore accusantium expedita provident veritatis incidunt accusamus fuga nihil magni eum beatae in nemo voluptatibus minus, iste maxime. Libero?</p>
        <p>Asperiores dicta debitis labore, quod perspiciatis facilis quis soluta, ratione nostrum eaque placeat nesciunt facere mollitia cum eius neque ipsa rerum repellendus. Autem quis ipsam nulla earum quos aperiam quas.</p>
        <p>Odio cumque, officia, nam facere suscipit adipisci porro est reiciendis laborum repellendus nesciunt dignissimos. Enim minus fuga tempora. Odio dolore voluptates sit ad praesentium hic rem. Voluptates nam voluptatem et.</p>
    </div>
    <script>
    const target = new URLSearchParams(window.location.search).get('target');
    
    var img = document.createElement("img");
        img.setAttribute('width', '100%');
        img.setAttribute('src', target);
        document.getElementById('content').prepend(img);
    </script>
</body>
</html>