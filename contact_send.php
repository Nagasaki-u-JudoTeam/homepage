<?php
// contact_send.php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 1) エスケープ/サニタイズ用関数
    function h($str) {
        return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
    }

    // 2) 再度入力値を取得（念のためバリデーションもしたい場合は再チェック）
    $email   = isset($_POST['email'])   ? trim($_POST['email'])   : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';

    // 3) 送信先・タイトル・本文などを設定
    //    メール送信先を依頼のに設定
    $to      = 'nagasaki.u.judoclub@gmail.com'; 
    $subject = '【お問い合わせ】長崎大学柔道部サイトより';
    // メール本文を組み立て
    $body    = "以下の内容でお問い合わせがありました。\n\n"
             . "【メールアドレス】\n$email\n\n"
             . "【お問い合わせ内容】\n$message\n\n";

    // 送信元/返信先をユーザーの入力したメールアドレスに
    $headers = "From: ".$email."\r\n"
             ."Reply-To: ".$email."\r\n"
             ."Content-Type: text/plain; charset=UTF-8\r\n";

    // 4) mail() 関数で送信を試みる
    $result = mail($to, $subject, $body, $headers);

    // 5) 送信結果表示用のHTML
    ?>
    <!DOCTYPE html>
    <html lang="ja">
    <head>
      <meta charset="UTF-8">
      <title>メール送信結果 - 長崎大学柔道部</title>
      <link rel="stylesheet" href="style.css">
    </head>
    <body>
      <main>
        <?php if ($result): ?>
          <h2>送信が完了しました</h2>
          <p>お問い合わせありがとうございました。</p>
          <p>内容を確認次第、担当者よりご連絡いたします。</p>
        <?php else: ?>
          <h2>送信に失敗しました</h2>
          <p>申し訳ありませんが、送信できませんでした。<br>
             時間をおいて再度お試しいただくか、Instagram DMをご利用ください。</p>
        <?php endif; ?>
        <p><a href="index.html">トップページに戻る</a></p>
      </main>
    </body>
    </html>
    <?php
} else {
    // 直接このページを開いた場合は、フォームへリダイレクト
    header('Location: contact.html');
    exit;
}


