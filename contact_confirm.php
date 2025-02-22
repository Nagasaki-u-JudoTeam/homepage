<?php
// contact_confirm.php

// 1) POSTデータを受け取る
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // エスケープやサニタイズして、XSS（クロスサイトスクリプティング）対策
    function h($str) {
        return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
    }

    // 2) 入力値を取得
    $email   = isset($_POST['email'])   ? trim($_POST['email'])   : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';

    // 3) バリデーション（サンプル版）
    $errors = [];
    if ($email === '') {
        $errors[] = 'メールアドレスは必須です。';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'メールアドレスの形式が正しくありません。';
    }
    if ($message === '') {
        $errors[] = 'お問い合わせ内容は必須です。';
    }

    // 4) エラーがあった場合、エラーメッセージを表示し、再入力を促す
    if (!empty($errors)) {
        // エラー表示用のHTML
        echo '<!DOCTYPE html><html><head><meta charset="UTF-8">';
        echo '<title>エラー - 長崎大学柔道部</title></head><body>';
        echo '<h2>入力エラーがあります</h2>';
        foreach ($errors as $error) {
            echo '<p style="color:red;">'.h($error).'</p>';
        }
        echo '<p><a href="contact.html">お問い合わせフォームに戻る</a></p>';
        echo '</body></html>';
        exit; // 処理を中断
    }

    // エラーがなければ、確認画面表示用HTMLを出力
    // 5) 確認画面のHTML
    ?>
    <!DOCTYPE html>
    <html lang="ja">
    <head>
        <meta charset="UTF-8" />
        <title>送信内容の確認 - 長崎大学柔道部</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>

    <main>
      <h2>送信内容の確認</h2>
      <p>以下の内容で送信します。よろしければ「送信する」ボタンを押してください。</p>

      <table>
        <tr><th>メールアドレス</th><td><?php echo h($email); ?></td></tr>
        <tr><th>お問い合わせ内容</th><td><?php echo nl2br(h($message)); ?></td></tr>
      </table>

      <!-- 6) 確認画面から送信する際は、hidden でPOSTデータを再送 -->
      <form action="contact_send.php" method="post">
        <input type="hidden" name="email" value="<?php echo h($email); ?>">
        <input type="hidden" name="message" value="<?php echo h($message); ?>">
        <button type="submit" class="submit-button">送信する</button>
      </form>

      <p><a href="contact.html">入力画面に戻る</a></p>
    </main>

    </body>
    </html>
    <?php
} else {
    // 直接このページを開いた場合は、フォームへリダイレクト
    header('Location: contact.html');
    exit;
}



