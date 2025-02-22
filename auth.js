/**
 * auth.js
 * 
 * - パスワード入力で"normal"もしくは"secret"のステータスをsessionStorageに保存
 * - 有効期限（例：5分）経過後は再度パスワード入力を求める
 * - secretモードの場合は特殊演出（showSecretAnimation）を呼び出す
 */

window.addEventListener('DOMContentLoaded', () => {
    // sessionStorage から認証ステータスと認証時刻を取得
    const authStatus = sessionStorage.getItem("authStatus");
    const authTime   = sessionStorage.getItem("authTime");
    
    // 認証有効期限をミリ秒で指定 (例：5分 = 300,000ミリ秒)
    const EXPIRATION_MS = 300000;
  
    if (authStatus && authTime) {
      // 時間が経過しすぎていないかチェック
      const now = Date.now();
      const elapsed = now - parseInt(authTime, 10);
  
      if (elapsed > EXPIRATION_MS) {
        // 期限切れ → 再度パスワード入力が必要
        sessionStorage.removeItem("authStatus");
        sessionStorage.removeItem("authTime");
        requestPassword();
      } 
        // 通常モードの場合は特に何もせずページを表示
  
    } else {
      // authStatus/認証時刻が無い → 初回アクセスまたは期限切れ → パスワード入力
      requestPassword();
    }
  });
  
  /**
   * パスワードを入力させる関数
   */
  function requestPassword() {
    const pw = prompt("パスワードを入力してください:");
    const currentPage = window.location.pathname.split("/").pop();
    if (pw === "sakinikumu") {
      // 通常モードで認証
      sessionStorage.setItem("authStatus", "normal");
      sessionStorage.setItem("authTime", Date.now().toString());
    } else if (pw === "yoisauna") {
      // 秘密モードで認証
      sessionStorage.setItem("authStatus", "secret");
      sessionStorage.setItem("authTime", Date.now().toString());
      if (currentPage === "index.html" || currentPage === "" || currentPage === undefined) {
        showSecretAnimation();
      }
    } else {
      // 誤ったパスワード → リダイレクトするか、エラー表示
      alert("パスワードが違います。");
      requestPassword(); // 関数の再帰呼び出し
    }
  }
  
  /**
   * 裏パスワード用の特別演出
   */
  /**
 * 秘密モード限定の特別演出
 * → 全画面オーバーレイを表示してクリックで閉じる
 */
　function showSecretAnimation() {
    // オーバーレイ要素を生成
    const overlay = document.createElement("div");
    overlay.id = "secretOverlay";
    
    // 好きなイラストをここで指定
    overlay.innerHTML = `
      <img src="img/secret_mode_image.png" alt="秘密モードイラスト">
    `;
    
    // オーバーレイ全体をクリックすると閉じる
    overlay.addEventListener("click", () => {
      document.body.removeChild(overlay);
    });
  
    // bodyにオーバーレイを追加してフルスクリーンで表示
    document.body.appendChild(overlay);
  }