/* ===================================================
   IMP – Icon Maker Pro メインスクリプト
   iOS (iPhone) / Android (PWA) / Windows マルチアイコン対応
   =================================================== */

// ==========================================
// Google Analytics 4 (GA4) イベント計測ヘルパー
// ==========================================
function trackEvent(eventName, eventParams = {}) {
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventParams);
    }
  } catch (err) {
    console.debug('Analytics trackEvent:', err);
  }
}

// ==========================================
// 多言語化 (i18n) 辞書 & 言語切替制御
// 対応言語 (12言語): ja, en, nl, pt, es, fr, it, de, uk, id, ko, tr
// ==========================================
const i18nData = {
  ja: {
    prompt_start: "キーを押すか、画面をクリック／タップして開始",
    app_subtitle: "iOS (iPhone) / Android (PWA) / Windows マルチ対応 アイコン作成ツール",
    tab_canvas: "A：キャンバスで描く",
    tab_upload: "B：画像をアップロードする",
    back_to_opening: "← 起動画面に戻る",
    back_to_lock: "← 前の画面に戻る",
    info_page_title: "Information",
    info_created_by: "このアプリは、<strong>H.Fukazu</strong>によって制作されました。",
    info_version: "バージョン：",
    info_updated_date: "（2026/10/10 更新）",
    info_initial_release: "初版リリース：",
    show_copyright: "📖 著作権情報を見る",
    hide_copyright: "📖 著作権情報を閉じる",
    back_to_top: "↑ TOP",
    layer_panel_title: "レイヤー一覧",
    layer_drag_hint: "ドラッグで順序変更",
    layer_empty_msg: "レイヤーはありません<br>描画すると追加されます",
    layer_delete_tip: "このレイヤーを削除",
    layer_rect: "四角",
    layer_circle: "円",
    layer_line: "直線",
    layer_pen: "ペン",
    layer_eraser: "消しゴム",
    layer_image: "画像",
    toast_layer_deleted: "🗑 レイヤーを削除しました",
    toast_undo: "↩ 1つ前の状態に戻しました",
    toast_redo: "↪ やり直しました",
    confirm_clear: "キャンバスの内容をクリアしますか？（「戻す」で復元できます）",
    toast_clear: "🗑 キャンバスをクリアしました",
    lbl_tool: "ツール",
    tool_pen: "✏️ ペン",
    tool_eraser: "🧹 消しゴム",
    tool_line: "📏 直線",
    tool_rect: "▢ 四角（枠）",
    tool_rect_fill: "■ 四角（塗り）",
    tool_circle: "◯ 円（枠）",
    tool_circle_fill: "● 円（塗り）",
    tool_text: "🔤 テキスト",
    tool_fill: "🪣 塗りつぶし",
    lbl_pen_color: "描画色",
    lbl_pen_size: "太さ",
    lbl_font_size: "文字サイズ",
    lbl_font_family: "フォント",
    font_gothic: "ゴシック (標準・モダン)",
    font_round: "丸ゴシック (ポップ・親しみ)",
    font_mincho: "明朝体 (優雅・和風)",
    font_brush: "行書体 (流麗・毛筆・和の美)",
    font_impact: "インパクト (超太字・力強い)",
    font_hand: "手書き (スクリプト風)",
    font_mono: "等幅 (テック・コード風)",
    font_classic: "クラシック (Georgia)",
    lbl_canvas_bg: "キャンバス背景",
    bg_transparent: "透過（チェッカー）",
    bg_black: "黒 (#000000)",
    bg_white: "白 (#ffffff)",
    bg_navy: "テーマ紺 (#0A0F1F)",
    btn_select_transform: "✋ 選択・変形",
    btn_rotate_90: "90°",
    btn_rotate_90_tip: "時計回りに90度回転",
    btn_undo: "↩ 戻す",
    btn_redo: "↪ やり直し",
    btn_clear: "🗑 クリア",
    tab_fx_color: "🎨 塗り形式 (単色/グラデ)",
    tab_fx_shadow: "🌑 立体 影 (Shadow)",
    tab_fx_gloss: "✨ 立体 艶 (Gloss/光沢)",
    tab_fx_filter: "🧪 フィルター (透明/ぼかし/尖鋭)",
    lbl_layer_opacity: "透明度 (不透明度)",
    lbl_layer_blur: "ぼかし (Blur)",
    lbl_layer_sharpen: "尖鋭化 (アンシャープ)",
    lbl_solid: "単色",
    lbl_gradient: "グラデーション",
    lbl_grad_c1: "開始色",
    lbl_grad_c2: "終了色",
    lbl_grad_dir: "方向",
    opt_dir_bottom: "上から下 ↓",
    opt_dir_right: "左から右 →",
    opt_dir_bottom_right: "斜め ↘",
    opt_dir_radial: "円形放射 ⊙",
    lbl_preset: "プリセット:",
    lbl_shadow_enable: "影をつける",
    lbl_shadow_blur: "ぼかし",
    lbl_shadow_offset: "距離/深さ",
    lbl_shadow_angle: "角度",
    lbl_shadow_color: "影色",
    lbl_shadow_opacity: "濃さ",
    lbl_gloss_enable: "艶・光沢をつける",
    lbl_gloss_type: "質感スタイル",
    opt_gloss_dome: "ガラスドーム光沢 (上部ハイライト反射)",
    opt_gloss_bevel: "3Dベベル (浮き彫り立体エッジ)",
    opt_gloss_glow: "ネオングロー (艶やかインナー発光)",
    lbl_gloss_intensity: "光沢の強さ",
    export_title_a: "📥 アイコン保存（キャンバス作成）",
    export_title_b: "📥 アイコン保存（アップロード画像）",
    badge_save_location: "📁 保存先フォルダを指定可能",
    lbl_ios_fill_a: "iPhone用(iOS)は透明部分を背景色で補完する <small>※iOSホーム画面は透過を黒にする仕様のため推奨</small>",
    lbl_ios_fill_b: "iPhone用(iOS)は透明部分を背景色で補完する <small>※iOSホーム画面用推奨</small>",
    btn_export_ios: "<strong>iPhone用</strong><small>apple-touch-icon (180×180)</small>",
    btn_export_android192: "<strong>Android用</strong><small>PWA標準 (192×192)</small>",
    btn_export_android512: "<strong>Android用 高精細</strong><small>PWAスプラッシュ (512×512)</small>",
    btn_export_ico: "<strong>Windows / Web</strong><small>favicon.ico (マルチサイズ)</small>",
    btn_export_png_a: "<strong>標準PNG</strong><small>imp_canvas.png (256×256)</small>",
    btn_export_png_b: "<strong>標準PNG</strong><small>imp_image.png (256×256)</small>",
    btn_export_zip: "<strong>全サイズ一括ZIP</strong><small>iOS + Android + Favicon + 設定</small>",
    drop_zone_title: "画像をここにドラッグ＆ドロップ",
    drop_zone_desc: "またはクリックして画像を選択（PNG, JPG, WEBP, SVG対応 / スマホ撮影写真OK）",
    btn_select_file: "ファイルを選択する",
    sample_gallery_title: "💡 著作権フリー・オリジナルサンプル（クリックで読み込み）",
    sample_gallery_loc: "保存場所",
    sample_icon_01: "フォルダー",
    sample_icon_02: "PC / モニタ",
    sample_icon_03: "ごみ箱",
    sample_icon_04: "文書",
    sample_icon_05: "設定",
    sample_icon_06: "パッケージ",
    sample_icon_07: "ブラウザ",
    sample_icon_08: "カメラ",
    sample_icon_09: "音楽",
    sample_icon_10: "ターミナル",
    lbl_fit_mode: "フィット形式：",
    opt_fit_cover: "中央トリミング（正方形を埋める・おすすめ）",
    opt_fit_contain: "全体を収める（比率維持・余白あり）",
    opt_fit_stretch: "引き伸ばし（256×256にストレッチ）",
    lbl_upload_bg: "余白・背景色：",
    btn_send_to_canvas: "🎨 キャンバスに転送してお絵描き・編集する",
    upload_no_file: "未選択（画像を選択してください）",
    snippet_title: "📋 Webアプリ・PWA組み込み用コード",
    btn_copy_code: "📋 コードをコピー",
    btn_copied_code: "✅ コピー完了！",
    snippet_desc: "作成したアイコンファイルをWebサイトのルートに配置し、HTMLの <code>&lt;head&gt;</code> 内に以下のタグを貼り付けるだけでiPhone・Android・PCすべてに対応できます。",
    btn_refresh_tip: "最新版を読み込む",
    btn_check_update: "🔄 最新版を確認",
    update_available: "新しいバージョンが利用可能です！",
    btn_update_now: "今すぐ更新",
    toast_checking_update: "🔄 最新版を確認中...",
    toast_latest_version: "✅ 現在最新のバージョンです",
    toast_updating: "🚀 最新版に更新して再読み込みします...",
    toast_update_completed: "🚀 最新バージョンに更新されました！"
  },
  en: {
    prompt_start: "Press any key or click / tap screen to start",
    app_subtitle: "Multi-platform Icon Generator for iOS, Android & Windows",
    tab_canvas: "A: Draw on Canvas",
    tab_upload: "B: Upload Image",
    back_to_opening: "← Back to Start",
    back_to_lock: "← Back",
    info_page_title: "Information",
    info_created_by: "This application was created by <strong>H.Fukazu</strong>.",
    info_version: "Version: ",
    info_updated_date: "(Updated: 2026/10/10)",
    info_initial_release: "Initial Release: ",
    show_copyright: "📖 View Copyright & Terms",
    hide_copyright: "📖 Hide Copyright & Terms",
    back_to_top: "↑ TOP",
    layer_panel_title: "Layer List",
    layer_drag_hint: "Drag to reorder",
    layer_empty_msg: "No layers yet<br>Draw on canvas to add one",
    layer_delete_tip: "Delete this layer",
    layer_rect: "Rectangle",
    layer_circle: "Circle",
    layer_line: "Line",
    layer_pen: "Pen",
    layer_eraser: "Eraser",
    layer_image: "Image",
    toast_layer_deleted: "🗑 Layer deleted",
    toast_undo: "↩ Undone",
    toast_redo: "↪ Redone",
    confirm_clear: "Clear canvas? (You can restore with Undo)",
    toast_clear: "🗑 Canvas cleared",
    lbl_tool: "Tool",
    tool_pen: "✏️ Pen",
    tool_eraser: "🧹 Eraser",
    tool_line: "📏 Line",
    tool_rect: "▢ Rectangle (Outline)",
    tool_rect_fill: "■ Rectangle (Fill)",
    tool_circle: "◯ Circle (Outline)",
    tool_circle_fill: "● Circle (Fill)",
    tool_text: "🔤 Text",
    tool_fill: "🪣 Bucket Fill",
    lbl_pen_color: "Draw Color",
    lbl_pen_size: "Stroke Size",
    lbl_font_size: "Font Size",
    lbl_font_family: "Font Family",
    font_gothic: "Gothic (Modern Sans)",
    font_round: "Rounded (Friendly)",
    font_mincho: "Serif (Elegant)",
    font_brush: "Calligraphy (Brush)",
    font_impact: "Impact (Bold)",
    font_hand: "Handwriting (Script)",
    font_mono: "Monospace (Code)",
    font_classic: "Classic (Georgia)",
    lbl_canvas_bg: "Canvas Background",
    bg_transparent: "Transparent (Checker)",
    bg_black: "Black (#000000)",
    bg_white: "White (#ffffff)",
    bg_navy: "Theme Navy (#0A0F1F)",
    btn_select_transform: "✋ Select / Transform",
    btn_rotate_90: "90°",
    btn_rotate_90_tip: "Rotate 90° Clockwise",
    btn_undo: "↩ Undo",
    btn_redo: "↪ Redo",
    btn_clear: "🗑 Clear",
    tab_fx_color: "🎨 Fill Style (Solid / Gradient)",
    tab_fx_shadow: "🌑 3D Shadow",
    tab_fx_gloss: "✨ 3D Gloss / Shine",
    tab_fx_filter: "🧪 Filter (Opacity/Blur/Sharpen)",
    lbl_layer_opacity: "Opacity",
    lbl_layer_blur: "Blur",
    lbl_layer_sharpen: "Sharpen",
    lbl_solid: "Solid",
    lbl_gradient: "Gradient",
    lbl_grad_c1: "Start Color",
    lbl_grad_c2: "End Color",
    lbl_grad_dir: "Direction",
    opt_dir_bottom: "Top to Bottom ↓",
    opt_dir_right: "Left to Right →",
    opt_dir_bottom_right: "Diagonal ↘",
    opt_dir_radial: "Radial ⊙",
    lbl_preset: "Presets:",
    lbl_shadow_enable: "Enable Shadow",
    lbl_shadow_blur: "Blur",
    lbl_shadow_offset: "Distance / Depth",
    lbl_shadow_angle: "Angle",
    lbl_shadow_color: "Shadow Color",
    lbl_shadow_opacity: "Opacity",
    lbl_gloss_enable: "Enable Gloss / Shine",
    lbl_gloss_type: "Style",
    opt_gloss_dome: "Glass Dome (Top Highlight)",
    opt_gloss_bevel: "3D Bevel (Embossed Edge)",
    opt_gloss_glow: "Neon Glow (Inner Shine)",
    lbl_gloss_intensity: "Gloss Intensity",
    export_title_a: "📥 Save Icons (Canvas)",
    export_title_b: "📥 Save Icons (Uploaded Image)",
    badge_save_location: "📁 Choose Folder Available",
    lbl_ios_fill_a: "Fill transparency with background for iPhone (iOS) <small>※Recommended as iOS home turns transparent into black</small>",
    lbl_ios_fill_b: "Fill transparency with background for iPhone (iOS) <small>※Recommended for iOS Home Screen</small>",
    btn_export_ios: "<strong>iPhone (iOS)</strong><small>apple-touch-icon (180×180)</small>",
    btn_export_android192: "<strong>Android</strong><small>PWA Standard (192×192)</small>",
    btn_export_android512: "<strong>Android High-Res</strong><small>PWA Splash (512×512)</small>",
    btn_export_ico: "<strong>Windows / Web</strong><small>favicon.ico (Multi-size)</small>",
    btn_export_png_a: "<strong>Standard PNG</strong><small>imp_canvas.png (256×256)</small>",
    btn_export_png_b: "<strong>Standard PNG</strong><small>imp_image.png (256×256)</small>",
    btn_export_zip: "<strong>All-in-One ZIP</strong><small>iOS + Android + Favicon + Manifest</small>",
    drop_zone_title: "Drag & Drop Image Here",
    drop_zone_desc: "or click to select file (Supports PNG, JPG, WEBP, SVG / Mobile photos OK)",
    btn_select_file: "Select File",
    sample_gallery_title: "💡 Copyright-Free Original Samples (Click to load)",
    sample_gallery_loc: "Location",
    sample_icon_01: "Folder",
    sample_icon_02: "PC / Display",
    sample_icon_03: "Recycle Bin",
    sample_icon_04: "Document",
    sample_icon_05: "Settings",
    sample_icon_06: "Package",
    sample_icon_07: "Browser",
    sample_icon_08: "Camera",
    sample_icon_09: "Music",
    sample_icon_10: "Terminal",
    lbl_fit_mode: "Fit Mode:",
    opt_fit_cover: "Center Crop (Fill Square - Recommended)",
    opt_fit_contain: "Contain All (Keep Aspect - Has Margins)",
    opt_fit_stretch: "Stretch (Fit 256×256)",
    lbl_upload_bg: "Margin / Background:",
    btn_send_to_canvas: "🎨 Transfer to Canvas to Draw & Edit",
    upload_no_file: "No file selected (Please choose an image)",
    snippet_title: "📋 Code Snippet for Web App & PWA",
    btn_copy_code: "📋 Copy Code",
    btn_copied_code: "✅ Copied!",
    snippet_desc: "Place the generated icon files in your website root and paste the following tags inside HTML <code>&lt;head&gt;</code> to support iPhone, Android, and PC.",
    btn_refresh_tip: "Reload latest version",
    btn_check_update: "🔄 Check for Updates",
    update_available: "A new version is available!",
    btn_update_now: "Update Now",
    toast_checking_update: "🔄 Checking for updates...",
    toast_latest_version: "✅ You are using the latest version",
    toast_updating: "🚀 Updating to latest version and reloading..."
  },
  nl: {
    prompt_start: "Druk op een toets of klik / tik om te starten",
    app_subtitle: "Multi-platform icoonmaker voor iOS, Android & Windows",
    tab_canvas: "A: Tekenen op canvas",
    tab_upload: "B: Afbeelding uploaden",
    back_to_opening: "← Terug naar start",
    back_to_lock: "← Terug",
    info_page_title: "Informatie",
    info_created_by: "Deze applicatie is gemaakt door <strong>H.Fukazu</strong>.",
    info_version: "Versie: ",
    info_updated_date: "(Bijgewerkt: 2026/10/10)",
    info_initial_release: "Eerste release: ",
    show_copyright: "📖 Bekijk auteursrechtinformatie",
    hide_copyright: "📖 Sluit auteursrechtinformatie",
    back_to_top: "↑ TOP",
    layer_panel_title: "Lagenlijst",
    layer_drag_hint: "Sleep om te herordenen",
    layer_empty_msg: "Nog geen lagen<br>Teken op het canvas om toe te voegen",
    layer_delete_tip: "Verwijder deze laag",
    layer_rect: "Rechthoek",
    layer_circle: "Cirkel",
    layer_line: "Lijn",
    layer_pen: "Pen",
    layer_eraser: "Gum",
    layer_image: "Afbeelding",
    toast_layer_deleted: "🗑 Laag verwijderd",
    toast_undo: "↩ Ongedaan gemaakt",
    toast_redo: "↪ Opnieuw uitgevoerd",
    confirm_clear: "Canvas wissen? (U kunt herstellen met Ongedaan maken)",
    toast_clear: "🗑 Canvas gewist",
    lbl_tool: "Gereedschap",
    tool_pen: "✏️ Pen",
    tool_eraser: "🧹 Gum",
    tool_line: "📏 Lijn",
    tool_rect: "▢ Rechthoek (omtrek)",
    tool_rect_fill: "■ Rechthoek (vulling)",
    tool_circle: "◯ Cirkel (omtrek)",
    tool_circle_fill: "● Cirkel (vulling)",
    tool_text: "🔤 Tekst",
    tool_fill: "🪣 Emmervulling",
    lbl_pen_color: "Tekenkleur",
    lbl_pen_size: "Dikte",
    lbl_font_size: "Lettergrootte",
    lbl_font_family: "Lettertype",
    font_gothic: "Gothic (Modern Schreefloos)",
    font_round: "Rond (Vriendelijk)",
    font_mincho: "Serif (Elegant)",
    font_brush: "Kalligrafie (Penseel)",
    font_impact: "Impact (Vet)",
    font_hand: "Handschrift (Script)",
    font_mono: "Monospace (Code)",
    font_classic: "Klassiek (Georgia)",
    lbl_canvas_bg: "Canvasachtergrond",
    bg_transparent: "Transparant (Raster)",
    bg_black: "Zwart (#000000)",
    bg_white: "Wit (#ffffff)",
    bg_navy: "Thema Marineblauw (#0A0F1F)",
    btn_select_transform: "✋ Selecteren / Transformeren",
    btn_rotate_90: "90°",
    btn_rotate_90_tip: "90° met de klok mee draaien",
    btn_undo: "↩ Ongedaan maken",
    btn_redo: "↪ Opnieuw uitvoeren",
    btn_clear: "🗑 Wissen",
    tab_fx_color: "🎨 Vullingsstijl (Effen / Verloop)",
    tab_fx_shadow: "🌑 3D Schaduw",
    tab_fx_gloss: "✨ 3D Glans",
    tab_fx_filter: "🧪 Filter (Dekking/Vervagen/Verscherpen)",
    lbl_layer_opacity: "Dekking",
    lbl_layer_blur: "Vervagen",
    lbl_layer_sharpen: "Verscherpen",
    lbl_solid: "Effen",
    lbl_gradient: "Kleurverloop",
    lbl_grad_c1: "Startkleur",
    lbl_grad_c2: "Eindkleur",
    lbl_grad_dir: "Richting",
    opt_dir_bottom: "Van boven naar beneden ↓",
    opt_dir_right: "Van links naar rechts →",
    opt_dir_bottom_right: "Diagonaal ↘",
    opt_dir_radial: "Radiaal ⊙",
    lbl_preset: "Voorinstellingen:",
    lbl_shadow_enable: "Schaduw inschakelen",
    lbl_shadow_blur: "Vervaging",
    lbl_shadow_offset: "Afstand / Diepte",
    lbl_shadow_angle: "Hoek",
    lbl_shadow_color: "Schaduwkleur",
    lbl_shadow_opacity: "Dekking",
    lbl_gloss_enable: "Glans inschakelen",
    lbl_gloss_type: "Textuurstijl",
    opt_gloss_dome: "Glazen koepel (Bovenste reflectie)",
    opt_gloss_bevel: "3D Schuine rand (Reliëf)",
    opt_gloss_glow: "Neongloed (Inwendige glans)",
    lbl_gloss_intensity: "Glanssterkte",
    export_title_a: "📥 Iconen opslaan (Canvas)",
    export_title_b: "📥 Iconen opslaan (Geüploade afbeelding)",
    badge_save_location: "📁 Map selecteren mogelijk",
    lbl_ios_fill_a: "Vul transparantie met achtergrondkleur voor iPhone (iOS) <small>※Aanbevolen omdat iOS zwart maakt</small>",
    lbl_ios_fill_b: "Vul transparantie met achtergrondkleur voor iPhone (iOS) <small>※Aanbevolen voor iOS-startscherm</small>",
    btn_export_ios: "<strong>Voor iPhone</strong><small>apple-touch-icon (180×180)</small>",
    btn_export_android192: "<strong>Voor Android</strong><small>PWA Standaard (192×192)</small>",
    btn_export_android512: "<strong>Android Hoge Res</strong><small>PWA Splash (512×512)</small>",
    btn_export_ico: "<strong>Windows / Web</strong><small>favicon.ico (Multi-formaat)</small>",
    btn_export_png_a: "<strong>Standaard PNG</strong><small>imp_canvas.png (256×256)</small>",
    btn_export_png_b: "<strong>Standaard PNG</strong><small>imp_image.png (256×256)</small>",
    btn_export_zip: "<strong>Alles-in-één ZIP</strong><small>iOS + Android + Favicon + Manifest</small>",
    drop_zone_title: "Sleep afbeelding hierheen",
    drop_zone_desc: "of klik om bestand te kiezen (PNG, JPG, WEBP, SVG ondersteund)",
    btn_select_file: "Bestand kiezen",
    sample_gallery_title: "💡 Rechtenvrije originele voorbeelden (Klik om te laden)",
    sample_gallery_loc: "Locatie",
    sample_icon_01: "Map",
    sample_icon_02: "PC / Scherm",
    sample_icon_03: "Prullenbak",
    sample_icon_04: "Document",
    sample_icon_05: "Instellingen",
    sample_icon_06: "Pakket",
    sample_icon_07: "Browser",
    sample_icon_08: "Camera",
    sample_icon_09: "Muziek",
    sample_icon_10: "Terminal",
    lbl_fit_mode: "Passend maken:",
    opt_fit_cover: "Centreren en bijsnijden (Vierkant vullen - Aanbevolen)",
    opt_fit_contain: "Alles passend maken (Verhouding behouden)",
    opt_fit_stretch: "Uitrekken (Naar 256×256 uitrekken)",
    lbl_upload_bg: "Marge / Achtergrond:",
    btn_send_to_canvas: "🎨 Naar canvas sturen om te tekenen & bewerken",
    upload_no_file: "Niet geselecteerd (Kies een afbeelding)",
    snippet_title: "📋 Code voor Web-app & PWA",
    btn_copy_code: "📋 Code kopiëren",
    btn_copied_code: "✅ Gekopieerd!",
    snippet_desc: "Plaats de gegenereerde pictogrambestanden in de hoofdmap van uw site en plak de tags in de HTML <code>&lt;head&gt;</code>.",
    btn_refresh_tip: "Laad de nieuwste versie",
    btn_check_update: "🔄 Controleer op updates",
    update_available: "Er is een nieuwe versie beschikbaar!",
    btn_update_now: "Nu bijwerken",
    toast_checking_update: "🔄 Controleren op updates...",
    toast_latest_version: "✅ U gebruikt de nieuwste versie",
    toast_updating: "🚀 Bijwerken naar nieuwste versie..."
  },
  pt: {
    prompt_start: "Pressione qualquer tecla ou toque para iniciar",
    app_subtitle: "Gerador de ícones multiplataforma para iOS, Android e Windows",
    tab_canvas: "A: Desenhar no Canvas",
    tab_upload: "B: Enviar Imagem",
    back_to_opening: "← Voltar ao início",
    back_to_lock: "← Voltar",
    info_page_title: "Informações",
    info_created_by: "Este aplicativo foi criado por <strong>H.Fukazu</strong>.",
    info_version: "Versão: ",
    info_updated_date: "(Atualizado em: 10/10/2026)",
    info_initial_release: "Lançamento inicial: ",
    show_copyright: "📖 Ver informações de direitos autorais",
    hide_copyright: "📖 Fechar informações de direitos autorais",
    back_to_top: "↑ TOP",
    layer_panel_title: "Lista de Camadas",
    layer_drag_hint: "Arraste para reordenar",
    layer_empty_msg: "Nenhuma camada ainda<br>Desenhe na tela para adicionar",
    layer_delete_tip: "Excluir esta camada",
    layer_rect: "Retângulo",
    layer_circle: "Círculo",
    layer_line: "Linha",
    layer_pen: "Caneta",
    layer_eraser: "Borracha",
    layer_image: "Imagem",
    toast_layer_deleted: "🗑 Camada excluída",
    toast_undo: "↩ Desfeito",
    toast_redo: "↪ Refeito",
    confirm_clear: "Limpar a tela? (Você pode restaurar com Desfazer)",
    toast_clear: "🗑 Tela limpa",
    lbl_tool: "Ferramenta",
    tool_pen: "✏️ Caneta",
    tool_eraser: "🧹 Borracha",
    tool_line: "📏 Linha",
    tool_rect: "▢ Retângulo (Contorno)",
    tool_rect_fill: "■ Retângulo (Preenchido)",
    tool_circle: "◯ Círculo (Contorno)",
    tool_circle_fill: "● Círculo (Preenchido)",
    tool_text: "🔤 Texto",
    tool_fill: "🪣 Balde de Tinta",
    lbl_pen_color: "Cor do Traço",
    lbl_pen_size: "Espessura",
    lbl_font_size: "Tamanho da Fonte",
    lbl_font_family: "Fonte",
    font_gothic: "Gótico (Moderno Sem Serifa)",
    font_round: "Arredondado (Amigável)",
    font_mincho: "Serifado (Elegante)",
    font_brush: "Caligrafia (Pincel)",
    font_impact: "Impacto (Negrito)",
    font_hand: "Manuscrito (Script)",
    font_mono: "Monoespaçado (Código)",
    font_classic: "Clássico (Georgia)",
    lbl_canvas_bg: "Fundo da Tela",
    bg_transparent: "Transparente (Xadrez)",
    bg_black: "Preto (#000000)",
    bg_white: "Branco (#ffffff)",
    bg_navy: "Azul Marinho (#0A0F1F)",
    btn_select_transform: "✋ Selecionar / Transformar",
    btn_rotate_90: "90°",
    btn_rotate_90_tip: "Girar 90° no sentido horário",
    btn_undo: "↩ Desfazer",
    btn_redo: "↪ Refazer",
    btn_clear: "🗑 Limpar",
    tab_fx_color: "🎨 Estilo de Preenchimento (Sólido / Gradiente)",
    tab_fx_shadow: "🌑 Sombra 3D",
    tab_fx_gloss: "✨ Brilho 3D / Lustro",
    tab_fx_filter: "🧪 Filtro (Opacidade/Desfoque/Nitidez)",
    lbl_layer_opacity: "Opacidade",
    lbl_layer_blur: "Desfoque",
    lbl_layer_sharpen: "Nitidez",
    lbl_solid: "Sólido",
    lbl_gradient: "Gradiente",
    lbl_grad_c1: "Cor Inicial",
    lbl_grad_c2: "Cor Final",
    lbl_grad_dir: "Direção",
    opt_dir_bottom: "De cima para baixo ↓",
    opt_dir_right: "Da esquerda para a direita →",
    opt_dir_bottom_right: "Diagonal ↘",
    opt_dir_radial: "Radial ⊙",
    lbl_preset: "Predefinições:",
    lbl_shadow_enable: "Ativar Sombra",
    lbl_shadow_blur: "Desfoque",
    lbl_shadow_offset: "Distância / Profundidade",
    lbl_shadow_angle: "Ângulo",
    lbl_shadow_color: "Cor da Sombra",
    lbl_shadow_opacity: "Opacidade",
    lbl_gloss_enable: "Ativar Brilho / Lustro",
    lbl_gloss_type: "Estilo",
    opt_gloss_dome: "Domo de Vidro (Reflexo Superior)",
    opt_gloss_bevel: "Bisel 3D (Borda em Relevo)",
    opt_gloss_glow: "Brilho Neon (Luz Interna)",
    lbl_gloss_intensity: "Intensidade do Brilho",
    export_title_a: "📥 Salvar Ícones (Canvas)",
    export_title_b: "📥 Salvar Ícones (Imagem Enviada)",
    badge_save_location: "📁 Seleção de pasta disponível",
    lbl_ios_fill_a: "Preencher transparência com fundo para iPhone (iOS) <small>※Recomendado pois o iOS torna transparente em preto</small>",
    lbl_ios_fill_b: "Preencher transparência com fundo para iPhone (iOS) <small>※Recomendado para tela de início do iOS</small>",
    btn_export_ios: "<strong>Para iPhone</strong><small>apple-touch-icon (180×180)</small>",
    btn_export_android192: "<strong>Para Android</strong><small>PWA Padrão (192×192)</small>",
    btn_export_android512: "<strong>Android Alta Res</strong><small>PWA Splash (512×512)</small>",
    btn_export_ico: "<strong>Windows / Web</strong><small>favicon.ico (Multi-tamanho)</small>",
    btn_export_png_a: "<strong>PNG Padrão</strong><small>imp_canvas.png (256×256)</small>",
    btn_export_png_b: "<strong>PNG Padrão</strong><small>imp_image.png (256×256)</small>",
    btn_export_zip: "<strong>ZIP Completo</strong><small>iOS + Android + Favicon + Manifesto</small>",
    drop_zone_title: "Arraste e solte a imagem aqui",
    drop_zone_desc: "ou clique para escolher um arquivo (Suporta PNG, JPG, WEBP, SVG)",
    btn_select_file: "Selecionar Arquivo",
    sample_gallery_title: "💡 Exemplos originais livres de direitos (Clique para carregar)",
    sample_gallery_loc: "Local",
    sample_icon_01: "Pasta",
    sample_icon_02: "PC / Tela",
    sample_icon_03: "Lixeira",
    sample_icon_04: "Documento",
    sample_icon_05: "Configurações",
    sample_icon_06: "Pacote",
    sample_icon_07: "Navegador",
    sample_icon_08: "Câmera",
    sample_icon_09: "Música",
    sample_icon_10: "Terminal",
    lbl_fit_mode: "Modo de Ajuste:",
    opt_fit_cover: "Recortar no Centro (Preencher quadrado - Recomendado)",
    opt_fit_contain: "Conter Tudo (Manter proporção)",
    opt_fit_stretch: "Esticar (Preencher 256×256)",
    lbl_upload_bg: "Margem / Cor de Fundo:",
    btn_send_to_canvas: "🎨 Enviar para tela para desenhar e editar",
    upload_no_file: "Não selecionado (Escolha uma imagem)",
    snippet_title: "📋 Código para Web App e PWA",
    btn_copy_code: "📋 Copiar Código",
    btn_copied_code: "✅ Copiado!",
    snippet_desc: "Coloque os arquivos gerados na raiz do seu site e cole as tags dentro do <code>&lt;head&gt;</code> do HTML.",
    btn_refresh_tip: "Carregar versão mais recente",
    btn_check_update: "🔄 Verificar atualizações",
    update_available: "Uma nova versão está disponível!",
    btn_update_now: "Atualizar Agora",
    toast_checking_update: "🔄 Verificando atualizações...",
    toast_latest_version: "✅ Você está usando a versão mais recente",
    toast_updating: "🚀 Atualizando para a versão mais recente..."
  },
  es: {
    prompt_start: "Presione cualquier tecla o toque para comenzar",
    app_subtitle: "Creador de iconos multiplataforma para iOS, Android y Windows",
    tab_canvas: "A: Dibujar en Lienzo",
    tab_upload: "B: Subir Imagen",
    back_to_opening: "← Volver al inicio",
    back_to_lock: "← Volver",
    info_page_title: "Información",
    info_created_by: "Esta aplicación fue creada por <strong>H.Fukazu</strong>.",
    info_version: "Versión: ",
    info_updated_date: "(Actualizado: 10/10/2026)",
    info_initial_release: "Lanzamiento inicial: ",
    show_copyright: "📖 Ver información de derechos de autor",
    hide_copyright: "📖 Cerrar información de derechos de autor",
    back_to_top: "↑ TOP",
    layer_panel_title: "Lista de Capas",
    layer_drag_hint: "Arrastrar para reordenar",
    layer_empty_msg: "Sin capas aún<br>Dibuja en el lienzo para añadir una",
    layer_delete_tip: "Eliminar esta capa",
    layer_rect: "Rectángulo",
    layer_circle: "Círculo",
    layer_line: "Línea",
    layer_pen: "Pluma",
    layer_eraser: "Borrador",
    layer_image: "Imagen",
    toast_layer_deleted: "🗑 Capa eliminada",
    toast_undo: "↩ Deshecho",
    toast_redo: "↪ Rehecho",
    confirm_clear: "¿Limpiar el lienzo? (Puedes restaurar con Deshacer)",
    toast_clear: "🗑 Lienzo limpiado",
    lbl_tool: "Herramienta",
    tool_pen: "✏️ Pluma",
    tool_eraser: "🧹 Borrador",
    tool_line: "📏 Línea",
    tool_rect: "▢ Rectángulo (Borde)",
    tool_rect_fill: "■ Rectángulo (Relleno)",
    tool_circle: "◯ Círculo (Borde)",
    tool_circle_fill: "● Círculo (Relleno)",
    tool_text: "🔤 Texto",
    tool_fill: "🪣 Relleno de Bote",
    lbl_pen_color: "Color del Trazo",
    lbl_pen_size: "Grosor",
    lbl_font_size: "Tamaño de Fuente",
    lbl_font_family: "Fuente",
    font_gothic: "Gótico (Moderno Sans)",
    font_round: "Redondeado (Amigable)",
    font_mincho: "Serif (Elegante)",
    font_brush: "Caligrafía (Pincel)",
    font_impact: "Impacto (Negrita)",
    font_hand: "Manuscrito (Script)",
    font_mono: "Monoespacio (Código)",
    font_classic: "Clásico (Georgia)",
    lbl_canvas_bg: "Fondo del Lienzo",
    bg_transparent: "Transparente (Cuadrícula)",
    bg_black: "Negro (#000000)",
    bg_white: "Blanco (#ffffff)",
    bg_navy: "Azul Marino (#0A0F1F)",
    btn_select_transform: "✋ Seleccionar / Transformar",
    btn_rotate_90: "90°",
    btn_rotate_90_tip: "Girar 90° en sentido horario",
    btn_undo: "↩ Deshacer",
    btn_redo: "↪ Rehacer",
    btn_clear: "🗑 Limpiar",
    tab_fx_color: "🎨 Estilo de Relleno (Sólido / Degradado)",
    tab_fx_shadow: "🌑 Sombra 3D",
    tab_fx_gloss: "✨ Brillo 3D / Lustre",
    tab_fx_filter: "🧪 Filtro (Opacidad/Desenfoque/Nitidez)",
    lbl_layer_opacity: "Opacidad",
    lbl_layer_blur: "Desenfoque",
    lbl_layer_sharpen: "Nitidez",
    lbl_solid: "Sólido",
    lbl_gradient: "Degradado",
    lbl_grad_c1: "Color Inicial",
    lbl_grad_c2: "Color Final",
    lbl_grad_dir: "Dirección",
    opt_dir_bottom: "De arriba a abajo ↓",
    opt_dir_right: "De izquierda a derecha →",
    opt_dir_bottom_right: "Diagonal ↘",
    opt_dir_radial: "Radial ⊙",
    lbl_preset: "Preajustes:",
    lbl_shadow_enable: "Activar Sombra",
    lbl_shadow_blur: "Desenfoque",
    lbl_shadow_offset: "Distancia / Profundidad",
    lbl_shadow_angle: "Ángulo",
    lbl_shadow_color: "Color de Sombra",
    lbl_shadow_opacity: "Opacidad",
    lbl_gloss_enable: "Activar Brillo / Lustre",
    lbl_gloss_type: "Estilo",
    opt_gloss_dome: "Cúpula de Cristal (Reflejo Superior)",
    opt_gloss_bevel: "Bisel 3D (Borde en Relieve)",
    opt_gloss_glow: "Brillo Neón (Luz Interior)",
    lbl_gloss_intensity: "Intensidad del Brillo",
    export_title_a: "📥 Guardar Iconos (Lienzo)",
    export_title_b: "📥 Guardar Iconos (Imagen Subida)",
    badge_save_location: "📁 Carpeta seleccionable",
    lbl_ios_fill_a: "Rellenar transparencia con color de fondo para iPhone (iOS) <small>※Recomendado ya que iOS muestra negro</small>",
    lbl_ios_fill_b: "Rellenar transparencia con color de fondo para iPhone (iOS) <small>※Recomendado para inicio de iOS</small>",
    btn_export_ios: "<strong>Para iPhone</strong><small>apple-touch-icon (180×180)</small>",
    btn_export_android192: "<strong>Para Android</strong><small>PWA Estándar (192×192)</small>",
    btn_export_android512: "<strong>Android Alta Res</strong><small>PWA Splash (512×512)</small>",
    btn_export_ico: "<strong>Windows / Web</strong><small>favicon.ico (Multitamaño)</small>",
    btn_export_png_a: "<strong>PNG Estándar</strong><small>imp_canvas.png (256×256)</small>",
    btn_export_png_b: "<strong>PNG Estándar</strong><small>imp_image.png (256×256)</small>",
    btn_export_zip: "<strong>ZIP Completo</strong><small>iOS + Android + Favicon + Manifiesto</small>",
    drop_zone_title: "Arrastra y suelta tu imagen aquí",
    drop_zone_desc: "o haz clic para elegir archivo (Compatible con PNG, JPG, WEBP, SVG)",
    btn_select_file: "Seleccionar Archivo",
    sample_gallery_title: "💡 Muestras originales libres de derechos (Clic para cargar)",
    sample_gallery_loc: "Ubicación",
    sample_icon_01: "Carpeta",
    sample_icon_02: "PC / Pantalla",
    sample_icon_03: "Papelera",
    sample_icon_04: "Documento",
    sample_icon_05: "Ajustes",
    sample_icon_06: "Paquete",
    sample_icon_07: "Navegador",
    sample_icon_08: "Cámara",
    sample_icon_09: "Música",
    sample_icon_10: "Terminal",
    lbl_fit_mode: "Modo de Ajuste:",
    opt_fit_cover: "Recorte Central (Llenar cuadrado - Recomendado)",
    opt_fit_contain: "Contener Todo (Mantener proporción)",
    opt_fit_stretch: "Estirar (Ajustar a 256×256)",
    lbl_upload_bg: "Margen / Color de Fondo:",
    btn_send_to_canvas: "🎨 Transferir al lienzo para dibujar y editar",
    upload_no_file: "No seleccionado (Elige una imagen)",
    snippet_title: "📋 Código para Web App y PWA",
    btn_copy_code: "📋 Copiar Código",
    btn_copied_code: "✅ ¡Copiado!",
    snippet_desc: "Coloca los iconos en la raíz de tu sitio y pega estas etiquetas en el <code>&lt;head&gt;</code> de tu HTML.",
    btn_refresh_tip: "Cargar última versión",
    btn_check_update: "🔄 Buscar actualizaciones",
    update_available: "¡Hay una nueva versión disponible!",
    btn_update_now: "Actualizar Ahora",
    toast_checking_update: "🔄 Buscando actualizaciones...",
    toast_latest_version: "✅ Estás utilizando la versión más reciente",
    toast_updating: "🚀 Actualizando a la última versión..."
  },
  fr: {
    prompt_start: "Appuyez sur une touche ou touchez pour démarrer",
    app_subtitle: "Générateur d'icônes multiplateforme pour iOS, Android et Windows",
    tab_canvas: "A: Dessiner sur canevas",
    tab_upload: "B: Télécharger une image",
    back_to_opening: "← Retour à l'accueil",
    back_to_lock: "← Retour",
    info_page_title: "Informations",
    info_created_by: "Cette application a été créée par <strong>H.Fukazu</strong>.",
    info_version: "Version : ",
    info_updated_date: "(Mis à jour : 10/10/2026)",
    info_initial_release: "Version initiale : ",
    show_copyright: "📖 Voir les mentions de droits d'auteur",
    hide_copyright: "📖 Fermer les mentions de droits d'auteur",
    back_to_top: "↑ TOP",
    layer_panel_title: "Liste des calques",
    layer_drag_hint: "Glisser pour réorganiser",
    layer_empty_msg: "Aucun calque pour l'instant<br>Dessinez pour en ajouter un",
    layer_delete_tip: "Supprimer ce calque",
    layer_rect: "Rectangle",
    layer_circle: "Cercle",
    layer_line: "Ligne",
    layer_pen: "Stylo",
    layer_eraser: "Gomme",
    layer_image: "Image",
    toast_layer_deleted: "🗑 Calque supprimé",
    toast_undo: "↩ Annulé",
    toast_redo: "↪ Rétabli",
    confirm_clear: "Effacer le canevas ? (Vous pouvez restaurer avec Annuler)",
    toast_clear: "🗑 Canevas effacé",
    lbl_tool: "Outil",
    tool_pen: "✏️ Stylo",
    tool_eraser: "🧹 Gomme",
    tool_line: "📏 Ligne",
    tool_rect: "▢ Rectangle (Contour)",
    tool_rect_fill: "■ Rectangle (Plein)",
    tool_circle: "◯ Cercle (Contour)",
    tool_circle_fill: "● Cercle (Plein)",
    tool_text: "🔤 Texte",
    tool_fill: "🪣 Pot de peinture",
    lbl_pen_color: "Couleur",
    lbl_pen_size: "Épaisseur",
    lbl_font_size: "Taille de police",
    lbl_font_family: "Police",
    font_gothic: "Gothique (Sans-serif moderne)",
    font_round: "Arrondi (Convivial)",
    font_mincho: "Sérif (Élégant)",
    font_brush: "Calligraphie (Pinceau)",
    font_impact: "Impact (Gras)",
    font_hand: "Manuscrit (Script)",
    font_mono: "Monospace (Code)",
    font_classic: "Classique (Georgia)",
    lbl_canvas_bg: "Fond du canevas",
    bg_transparent: "Transparent (Damier)",
    bg_black: "Noir (#000000)",
    bg_white: "Blanc (#ffffff)",
    bg_navy: "Bleu marine (#0A0F1F)",
    btn_select_transform: "✋ Sélectionner / Transformer",
    btn_rotate_90: "90°",
    btn_rotate_90_tip: "Faire pivoter de 90° dans le sens horaire",
    btn_undo: "↩ Annuler",
    btn_redo: "↪ Rétablir",
    btn_clear: "🗑 Effacer",
    tab_fx_color: "🎨 Remplissage (Uni / Dégradé)",
    tab_fx_shadow: "🌑 Ombre 3D",
    tab_fx_gloss: "✨ Brillance 3D",
    tab_fx_filter: "🧪 Filtre (Opacité/Flou/Netteté)",
    lbl_layer_opacity: "Opacité",
    lbl_layer_blur: "Flou",
    lbl_layer_sharpen: "Netteté",
    lbl_solid: "Uni",
    lbl_gradient: "Dégradé",
    lbl_grad_c1: "Couleur début",
    lbl_grad_c2: "Couleur fin",
    lbl_grad_dir: "Direction",
    opt_dir_bottom: "De haut en bas ↓",
    opt_dir_right: "De gauche à droite →",
    opt_dir_bottom_right: "En diagonale ↘",
    opt_dir_radial: "Radial ⊙",
    lbl_preset: "Préréglages :",
    lbl_shadow_enable: "Activer l'ombre",
    lbl_shadow_blur: "Flou",
    lbl_shadow_offset: "Distance / Profondeur",
    lbl_shadow_angle: "Angle",
    lbl_shadow_color: "Couleur de l'ombre",
    lbl_shadow_opacity: "Opacité",
    lbl_gloss_enable: "Activer la brillance",
    lbl_gloss_type: "Style de texture",
    opt_gloss_dome: "Dôme de verre (Reflet supérieur)",
    opt_gloss_bevel: "Biseau 3D (Bord en relief)",
    opt_gloss_glow: "Lueur néon (Éclat intérieur)",
    lbl_gloss_intensity: "Intensité du brillant",
    export_title_a: "📥 Enregistrer les icônes (Canevas)",
    export_title_b: "📥 Enregistrer les icônes (Image)",
    badge_save_location: "📁 Dossier sélectionnable",
    lbl_ios_fill_a: "Remplir la transparence pour iPhone (iOS) <small>※Recommandé car iOS affiche du noir</small>",
    lbl_ios_fill_b: "Remplir la transparence pour iPhone (iOS) <small>※Recommandé pour écran d'accueil iOS</small>",
    btn_export_ios: "<strong>Pour iPhone</strong><small>apple-touch-icon (180×180)</small>",
    btn_export_android192: "<strong>Pour Android</strong><small>PWA Standard (192×192)</small>",
    btn_export_android512: "<strong>Android Haute Rés</strong><small>PWA Splash (512×512)</small>",
    btn_export_ico: "<strong>Windows / Web</strong><small>favicon.ico (Multi-taille)</small>",
    btn_export_png_a: "<strong>PNG Standard</strong><small>imp_canvas.png (256×256)</small>",
    btn_export_png_b: "<strong>PNG Standard</strong><small>imp_image.png (256×256)</small>",
    btn_export_zip: "<strong>Pack complet ZIP</strong><small>iOS + Android + Favicon + Manifest</small>",
    drop_zone_title: "Glissez et déposez l'image ici",
    drop_zone_desc: "ou cliquez pour choisir un fichier (PNG, JPG, WEBP, SVG acceptés)",
    btn_select_file: "Choisir un fichier",
    sample_gallery_title: "💡 Exemples originaux libres de droits (Cliquez pour charger)",
    sample_gallery_loc: "Emplacement",
    sample_icon_01: "Dossier",
    sample_icon_02: "PC / Écran",
    sample_icon_03: "Corbeille",
    sample_icon_04: "Document",
    sample_icon_05: "Paramètres",
    sample_icon_06: "Paquet",
    sample_icon_07: "Navigateur",
    sample_icon_08: "Appareil photo",
    sample_icon_09: "Musique",
    sample_icon_10: "Terminal",
    lbl_fit_mode: "Ajustement :",
    opt_fit_cover: "Rogner au centre (Remplir le carré - Recommandé)",
    opt_fit_contain: "Tout ajuster (Conserver les proportions)",
    opt_fit_stretch: "Étirer (Adapter à 256×256)",
    lbl_upload_bg: "Marge / Couleur de fond :",
    btn_send_to_canvas: "🎨 Transférer sur le canevas pour dessiner et retoucher",
    upload_no_file: "Non sélectionné (Veuillez choisir une image)",
    snippet_title: "📋 Code pour application Web et PWA",
    btn_copy_code: "📋 Copier le code",
    btn_copied_code: "✅ Copié !",
    snippet_desc: "Placez les fichiers à la racine de votre site et collez les balises dans le <code>&lt;head&gt;</code> HTML.",
    btn_refresh_tip: "Charger la dernière version",
    btn_check_update: "🔄 Vérifier les mises à jour",
    update_available: "Une nouvelle version est disponible !",
    btn_update_now: "Mettre à jour",
    toast_checking_update: "🔄 Recherche de mises à jour...",
    toast_latest_version: "✅ Vous utilisez la dernière version",
    toast_updating: "🚀 Mise à jour vers la dernière version..."
  },
  it: {
    prompt_start: "Premi un tasto o tocca per iniziare",
    app_subtitle: "Generatore di icone multipiattaforma per iOS, Android e Windows",
    tab_canvas: "A: Disegna su tela",
    tab_upload: "B: Carica Immagine",
    back_to_opening: "← Torna all'inizio",
    back_to_lock: "← Indietro",
    info_page_title: "Informazioni",
    info_created_by: "Questa app è stata creata da <strong>H.Fukazu</strong>.",
    info_version: "Versione: ",
    info_updated_date: "(Aggiornato: 10/10/2026)",
    info_initial_release: "Rilascio iniziale: ",
    show_copyright: "📖 Visualizza informazioni sul copyright",
    hide_copyright: "📖 Chiudi informazioni sul copyright",
    back_to_top: "↑ TOP",
    layer_panel_title: "Elenco Livelli",
    layer_drag_hint: "Trascina per riordinare",
    layer_empty_msg: "Nessun livello ancora<br>Disegna sulla tela per aggiungerne uno",
    layer_delete_tip: "Elimina questo livello",
    layer_rect: "Rettangolo",
    layer_circle: "Cerchio",
    layer_line: "Linea",
    layer_pen: "Penna",
    layer_eraser: "Gomma",
    layer_image: "Immagine",
    toast_layer_deleted: "🗑 Livello eliminato",
    toast_undo: "↩ Annullato",
    toast_redo: "↪ Ripetuto",
    confirm_clear: "Cancellare la tela? (Puoi ripristinare con Annulla)",
    toast_clear: "🗑 Tela cancellata",
    lbl_tool: "Strumento",
    tool_pen: "✏️ Penna",
    tool_eraser: "🧹 Gomma",
    tool_line: "📏 Linea",
    tool_rect: "▢ Rettangolo (Tratto)",
    tool_rect_fill: "■ Rettangolo (Pieno)",
    tool_circle: "◯ Cerchio (Tratto)",
    tool_circle_fill: "● Cerchio (Pieno)",
    tool_text: "🔤 Testo",
    tool_fill: "🪣 Secchiello",
    lbl_pen_color: "Colore",
    lbl_pen_size: "Spessore",
    lbl_font_size: "Dimensione carattere",
    lbl_font_family: "Carattere",
    font_gothic: "Gotico (Sans moderno)",
    font_round: "Arrotondato (Amichevole)",
    font_mincho: "Serif (Elegante)",
    font_brush: "Calligrafia (Pennello)",
    font_impact: "Impact (Grassetto)",
    font_hand: "Scrittura a mano (Corsivo)",
    font_mono: "Spazio fisso (Codice)",
    font_classic: "Classico (Georgia)",
    lbl_canvas_bg: "Sfondo Tela",
    bg_transparent: "Trasparente (Scacchiera)",
    bg_black: "Nero (#000000)",
    bg_white: "Bianco (#ffffff)",
    bg_navy: "Blu Scuro (#0A0F1F)",
    btn_select_transform: "✋ Seleziona / Trasforma",
    btn_rotate_90: "90°",
    btn_rotate_90_tip: "Ruota di 90° in senso orario",
    btn_undo: "↩ Annulla",
    btn_redo: "↪ Ripeti",
    btn_clear: "🗑 Cancella",
    tab_fx_color: "🎨 Stile Riempimento (Tinta unita / Sfumatura)",
    tab_fx_shadow: "🌑 Ombra 3D",
    tab_fx_gloss: "✨ Lucentezza 3D",
    tab_fx_filter: "🧪 Filtro (Opacità/Sfocatura/Nitidezza)",
    lbl_layer_opacity: "Opacità",
    lbl_layer_blur: "Sfocatura",
    lbl_layer_sharpen: "Nitidezza",
    lbl_solid: "Tinta unita",
    lbl_gradient: "Sfumatura",
    lbl_grad_c1: "Colore iniziale",
    lbl_grad_c2: "Colore finale",
    lbl_grad_dir: "Direzione",
    opt_dir_bottom: "Dall'alto in basso ↓",
    opt_dir_right: "Da sinistra a destra →",
    opt_dir_bottom_right: "Diagonale ↘",
    opt_dir_radial: "Radiale ⊙",
    lbl_preset: "Preimpostazioni:",
    lbl_shadow_enable: "Attiva Ombra",
    lbl_shadow_blur: "Sfocatura",
    lbl_shadow_offset: "Distanza / Profondità",
    lbl_shadow_angle: "Angolo",
    lbl_shadow_color: "Colore Ombra",
    lbl_shadow_opacity: "Opacità",
    lbl_gloss_enable: "Attiva Lucentezza",
    lbl_gloss_type: "Stile",
    opt_gloss_dome: "Cupola di Vetro (Riflesso Superiore)",
    opt_gloss_bevel: "Smussatura 3D (Bordo a Rilievo)",
    opt_gloss_glow: "Bagliore Neon (Luce Interna)",
    lbl_gloss_intensity: "Intensità Lucentezza",
    export_title_a: "📥 Salva Icone (Tela)",
    export_title_b: "📥 Salva Icone (Immagine Caricata)",
    badge_save_location: "📁 Cartella selezionabile",
    lbl_ios_fill_a: "Riempi la trasparenza per iPhone (iOS) <small>※Consigliato poiché iOS rende nero</small>",
    lbl_ios_fill_b: "Riempi la trasparenza per iPhone (iOS) <small>※Consigliato per la schermata home di iOS</small>",
    btn_export_ios: "<strong>Per iPhone</strong><small>apple-touch-icon (180×180)</small>",
    btn_export_android192: "<strong>Per Android</strong><small>PWA Standard (192×192)</small>",
    btn_export_android512: "<strong>Android Alta Res</strong><small>PWA Splash (512×512)</small>",
    btn_export_ico: "<strong>Windows / Web</strong><small>favicon.ico (Multi-dimensione)</small>",
    btn_export_png_a: "<strong>PNG Standard</strong><small>imp_canvas.png (256×256)</small>",
    btn_export_png_b: "<strong>PNG Standard</strong><small>imp_image.png (256×256)</small>",
    btn_export_zip: "<strong>ZIP Completo</strong><small>iOS + Android + Favicon + Manifesto</small>",
    drop_zone_title: "Trascina e rilascia l'immagine qui",
    drop_zone_desc: "o clicca per scegliere un file (Supporta PNG, JPG, WEBP, SVG)",
    btn_select_file: "Seleziona File",
    sample_gallery_title: "💡 Campioni originali senza copyright (Clicca per caricare)",
    sample_gallery_loc: "Posizione",
    sample_icon_01: "Cartella",
    sample_icon_02: "PC / Monitor",
    sample_icon_03: "Cestino",
    sample_icon_04: "Documento",
    sample_icon_05: "Impostazioni",
    sample_icon_06: "Pacchetto",
    sample_icon_07: "Browser",
    sample_icon_08: "Fotocamera",
    sample_icon_09: "Musica",
    sample_icon_10: "Terminale",
    lbl_fit_mode: "Modalità di Adattamento:",
    opt_fit_cover: "Ritaglio al centro (Riempi quadrato - Consigliato)",
    opt_fit_contain: "Contieni tutto (Mantieni proporzioni)",
    opt_fit_stretch: "Allunga (Adatta a 256×256)",
    lbl_upload_bg: "Margine / Colore Sfondo:",
    btn_send_to_canvas: "🎨 Trasferisci sulla tela per disegnare e modificare",
    upload_no_file: "Non selezionato (Scegli un'immagine)",
    snippet_title: "📋 Codice per Web App e PWA",
    btn_copy_code: "📋 Copia Codice",
    btn_copied_code: "✅ Copiato!",
    snippet_desc: "Posiziona i file nella radice del tuo sito e incolla i tag all'interno di <code>&lt;head&gt;</code> HTML.",
    btn_refresh_tip: "Carica l'ultima versione",
    btn_check_update: "🔄 Controlla aggiornamenti",
    update_available: "È disponibile una nuova versione!",
    btn_update_now: "Aggiorna ora",
    toast_checking_update: "🔄 Ricerca aggiornamenti...",
    toast_latest_version: "✅ Stai utilizzando l'ultima versione",
    toast_updating: "🚀 Aggiornamento alla versione più recente..."
  },
  de: {
    prompt_start: "Taste drücken oder tippen zum Starten",
    app_subtitle: "Multiplattform-Icon-Studio für iOS, Android und Windows",
    tab_canvas: "A: Auf Leinwand zeichnen",
    tab_upload: "B: Bild hochladen",
    back_to_opening: "← Zurück zum Start",
    back_to_lock: "← Zurück",
    info_page_title: "Informationen",
    info_created_by: "Diese App wurde von <strong>H.Fukazu</strong> entwickelt.",
    info_version: "Version: ",
    info_updated_date: "(Aktualisiert: 10.10.2026)",
    info_initial_release: "Erstveröffentlichung: ",
    show_copyright: "📖 Urheberrechtsinformationen anzeigen",
    hide_copyright: "📖 Urheberrechtsinformationen schließen",
    back_to_top: "↑ TOP",
    layer_panel_title: "Ebenenliste",
    layer_drag_hint: "Ziehen zum Neuanordnen",
    layer_empty_msg: "Noch keine Ebenen vorhanden<br>Auf der Leinwand zeichnen, um hinzuzufügen",
    layer_delete_tip: "Diese Ebene löschen",
    layer_rect: "Rechteck",
    layer_circle: "Kreis",
    layer_line: "Linie",
    layer_pen: "Stift",
    layer_eraser: "Radiergummi",
    layer_image: "Bild",
    toast_layer_deleted: "🗑 Ebene gelöscht",
    toast_undo: "↩ Rückgängig gemacht",
    toast_redo: "↪ Wiederholt",
    confirm_clear: "Leinwand löschen? (Sie können mit Rückgängig wiederherstellen)",
    toast_clear: "🗑 Leinwand gelöscht",
    lbl_tool: "Werkzeug",
    tool_pen: "✏️ Stift",
    tool_eraser: "🧹 Radiergummi",
    tool_line: "📏 Linie",
    tool_rect: "▢ Rechteck (Kontur)",
    tool_rect_fill: "■ Rechteck (Gefüllt)",
    tool_circle: "◯ Kreis (Kontur)",
    tool_circle_fill: "● Kreis (Gefüllt)",
    tool_text: "🔤 Text",
    tool_fill: "🪣 Fülleimer",
    lbl_pen_color: "Farbe",
    lbl_pen_size: "Stärke",
    lbl_font_size: "Schriftgröße",
    lbl_font_family: "Schriftart",
    font_gothic: "Gotisch (Modernes Sans)",
    font_round: "Abgerundet (Freundlich)",
    font_mincho: "Serif (Elegant)",
    font_brush: "Kalligraphie (Pinsel)",
    font_impact: "Impact (Fett)",
    font_hand: "Handschrift (Skript)",
    font_mono: "Festbreite (Code)",
    font_classic: "Klassisch (Georgia)",
    lbl_canvas_bg: "Leinwandhintergrund",
    bg_transparent: "Transparent (Schachbrett)",
    bg_black: "Schwarz (#000000)",
    bg_white: "Weiß (#ffffff)",
    bg_navy: "Dunkelblau (#0A0F1F)",
    btn_select_transform: "✋ Auswählen / Transformieren",
    btn_rotate_90: "90°",
    btn_rotate_90_tip: "Im Uhrzeigersinn um 90° drehen",
    btn_undo: "↩ Rückgängig",
    btn_redo: "↪ Wiederholen",
    btn_clear: "🗑 Löschen",
    tab_fx_color: "🎨 Füllstil (Einfarbig / Verlauf)",
    tab_fx_shadow: "🌑 3D-Schatten",
    tab_fx_gloss: "✨ 3D-Glanz",
    tab_fx_filter: "🧪 Filter (Deckkraft/Weichzeichner/Schärfen)",
    lbl_layer_opacity: "Deckkraft",
    lbl_layer_blur: "Weichzeichner",
    lbl_layer_sharpen: "Schärfen",
    lbl_solid: "Einfarbig",
    lbl_gradient: "Farbverlauf",
    lbl_grad_c1: "Startfarbe",
    lbl_grad_c2: "Endfarbe",
    lbl_grad_dir: "Richtung",
    opt_dir_bottom: "Von oben nach unten ↓",
    opt_dir_right: "Von links nach rechts →",
    opt_dir_bottom_right: "Diagonal ↘",
    opt_dir_radial: "Kreisförmig ⊙",
    lbl_preset: "Voreinstellungen:",
    lbl_shadow_enable: "Schatten aktivieren",
    lbl_shadow_blur: "Weichzeichner",
    lbl_shadow_offset: "Abstand / Tiefe",
    lbl_shadow_angle: "Winkel",
    lbl_shadow_color: "Schattenfarbe",
    lbl_shadow_opacity: "Deckkraft",
    lbl_gloss_enable: "Glanz aktivieren",
    lbl_gloss_type: "Stil",
    opt_gloss_dome: "Glaskuppel (Oberes Highlight)",
    opt_gloss_bevel: "3D-Fase (Reliefkante)",
    opt_gloss_glow: "Neon-Glühen (Inneres Leuchten)",
    lbl_gloss_intensity: "Glanzintensität",
    export_title_a: "📥 Icons speichern (Leinwand)",
    export_title_b: "📥 Icons speichern (Bild)",
    badge_save_location: "📁 Ordnerauswahl möglich",
    lbl_ios_fill_a: "Transparenz mit Hintergrund für iPhone (iOS) füllen <small>※Empfohlen, da iOS schwarz färbt</small>",
    lbl_ios_fill_b: "Transparenz mit Hintergrund für iPhone (iOS) füllen <small>※Empfohlen für iOS-Startbildschirm</small>",
    btn_export_ios: "<strong>Für iPhone</strong><small>apple-touch-icon (180×180)</small>",
    btn_export_android192: "<strong>Für Android</strong><small>PWA Standard (192×192)</small>",
    btn_export_android512: "<strong>Android Hochauflösend</strong><small>PWA Splash (512×512)</small>",
    btn_export_ico: "<strong>Windows / Web</strong><small>favicon.ico (Multi-Format)</small>",
    btn_export_png_a: "<strong>Standard-PNG</strong><small>imp_canvas.png (256×256)</small>",
    btn_export_png_b: "<strong>Standard-PNG</strong><small>imp_image.png (256×256)</small>",
    btn_export_zip: "<strong>Komplettes ZIP</strong><small>iOS + Android + Favicon + Manifest</small>",
    drop_zone_title: "Bild hierher ziehen & ablegen",
    drop_zone_desc: "oder klicken, um eine Datei auszuwählen (PNG, JPG, WEBP, SVG unterstützt)",
    btn_select_file: "Datei auswählen",
    sample_gallery_title: "💡 Lizenzfreie Originalmuster (Klicken zum Laden)",
    sample_gallery_loc: "Speicherort",
    sample_icon_01: "Ordner",
    sample_icon_02: "PC / Monitor",
    sample_icon_03: "Papierkorb",
    sample_icon_04: "Dokument",
    sample_icon_05: "Einstellungen",
    sample_icon_06: "Paket",
    sample_icon_07: "Browser",
    sample_icon_08: "Kamera",
    sample_icon_09: "Musik",
    sample_icon_10: "Terminal",
    lbl_fit_mode: "Einpassung:",
    opt_fit_cover: "Mitte zuschneiden (Quadrat füllen - Empfohlen)",
    opt_fit_contain: "Alles einpassen (Proportionen beibehalten)",
    opt_fit_stretch: "Dehnen (Auf 256×256 strecken)",
    lbl_upload_bg: "Rand / Hintergrund:",
    btn_send_to_canvas: "🎨 Auf Leinwand übertragen zum Zeichnen & Bearbeiten",
    upload_no_file: "Nicht ausgewählt (Bitte Bild wählen)",
    snippet_title: "📋 Code für Web-App & PWA",
    btn_copy_code: "📋 Code kopieren",
    btn_copied_code: "✅ Kopiert!",
    snippet_desc: "Platzieren Sie die Symboldateien im Stammverzeichnis Ihrer Website und fügen Sie diese Tags in <code>&lt;head&gt;</code> ein.",
    btn_refresh_tip: "Neueste Version laden",
    btn_check_update: "🔄 Nach Updates suchen",
    update_available: "Eine neue Version ist verfügbar!",
    btn_update_now: "Jetzt aktualisieren",
    toast_checking_update: "🔄 Nach Updates wird gesucht...",
    toast_latest_version: "✅ Sie verwenden die neueste Version",
    toast_updating: "🚀 Auf neueste Version aktualisieren..."
  },
  uk: {
    prompt_start: "Натисніть клавішу або торкніться екрана",
    app_subtitle: "Багатоплатформний генератор іконок для iOS, Android та Windows",
    tab_canvas: "A: Малювати на полотні",
    tab_upload: "B: Завантажити зображення",
    back_to_opening: "← До початку",
    back_to_lock: "← Назад",
    info_page_title: "Інформація",
    info_created_by: "Цей додаток створено <strong>H.Fukazu</strong>.",
    info_version: "Версія: ",
    info_updated_date: "(Оновлено: 10.10.2026)",
    info_initial_release: "Перший реліз: ",
    show_copyright: "📖 Переглянути інформацію про авторські права",
    hide_copyright: "📖 Закрити інформацію про авторські права",
    back_to_top: "↑ TOP",
    layer_panel_title: "Список шарів",
    layer_drag_hint: "Перетягніть для зміни порядку",
    layer_empty_msg: "Шарів поки немає<br>Малюйте на полотні, щоб додати",
    layer_delete_tip: "Видалити цей шар",
    layer_rect: "Прямокутник",
    layer_circle: "Коло",
    layer_line: "Лінія",
    layer_pen: "Перо",
    layer_eraser: "Гумка",
    layer_image: "Зображення",
    toast_layer_deleted: "🗑 Шар видалено",
    toast_undo: "↩ Скасовано",
    toast_redo: "↪ Повторено",
    confirm_clear: "Очистити полотно? (Можна відновити через Скасувати)",
    toast_clear: "🗑 Полотно очищено",
    lbl_tool: "Інструмент",
    tool_pen: "✏️ Перо",
    tool_eraser: "🧹 Гумка",
    tool_line: "📏 Лінія",
    tool_rect: "▢ Прямокутник (Контур)",
    tool_rect_fill: "■ Прямокутник (Заливка)",
    tool_circle: "◯ Коло (Контур)",
    tool_circle_fill: "● Коло (Заливка)",
    tool_text: "🔤 Текст",
    tool_fill: "🪣 Заливка",
    lbl_pen_color: "Колір",
    lbl_pen_size: "Товщина",
    lbl_font_size: "Розмір шрифту",
    lbl_font_family: "Шрифт",
    font_gothic: "Готичний (Сучасний гротеск)",
    font_round: "Округлий (Дружній)",
    font_mincho: "Антиква (Елегантний)",
    font_brush: "Каліграфія (Пензель)",
    font_impact: "Impact (Жирний)",
    font_hand: "Рукописний (Скрипт)",
    font_mono: "Моноширинний (Код)",
    font_classic: "Класичний (Georgia)",
    lbl_canvas_bg: "Фон полотна",
    bg_transparent: "Прозорий (Шахівниця)",
    bg_black: "Чорний (#000000)",
    bg_white: "Білий (#ffffff)",
    bg_navy: "Темно-синій (#0A0F1F)",
    btn_select_transform: "✋ Вибір / Трансформація",
    btn_rotate_90: "90°",
    btn_rotate_90_tip: "Повернути на 90° за годинниковою стрілкою",
    btn_undo: "↩ Скасувати",
    btn_redo: "↪ Повторити",
    btn_clear: "🗑 Очистити",
    tab_fx_color: "🎨 Стиль заливки (Однотонний / Градієнт)",
    tab_fx_shadow: "🌑 3D Тінь",
    tab_fx_gloss: "✨ 3D Блиск / Глянець",
    tab_fx_filter: "🧪 Фільтр (Прозорість/Розмиття/Різкість)",
    lbl_layer_opacity: "Непрозорість",
    lbl_layer_blur: "Розмиття",
    lbl_layer_sharpen: "Різкість",
    lbl_solid: "Однотонний",
    lbl_gradient: "Градієнт",
    lbl_grad_c1: "Початковий колір",
    lbl_grad_c2: "Кінцевий колір",
    lbl_grad_dir: "Напрямок",
    opt_dir_bottom: "Зверху вниз ↓",
    opt_dir_right: "Зліва направо →",
    opt_dir_bottom_right: "По діагоналі ↘",
    opt_dir_radial: "Радіальний ⊙",
    lbl_preset: "Пресети:",
    lbl_shadow_enable: "Увімкнути тінь",
    lbl_shadow_blur: "Розмиття",
    lbl_shadow_offset: "Відстань / Глибина",
    lbl_shadow_angle: "Кут",
    lbl_shadow_color: "Колір тіні",
    lbl_shadow_opacity: "Непрозорість",
    lbl_gloss_enable: "Увімкнути блиск",
    lbl_gloss_type: "Стиль текстури",
    opt_gloss_dome: "Скляний купол (Верхній відблиск)",
    opt_gloss_bevel: "3D Фаска (Рельєфний край)",
    opt_gloss_glow: "Неонове сяйво (Внутрішній блиск)",
    lbl_gloss_intensity: "Інтенсивність блиску",
    export_title_a: "📥 Зберегти іконки (Полотно)",
    export_title_b: "📥 Зберегти іконки (Завантажене зображення)",
    badge_save_location: "📁 Вибір папки доступний",
    lbl_ios_fill_a: "Заповнити прозорість фоном для iPhone (iOS) <small>※Рекомендовано, оскільки iOS робить чорним</small>",
    lbl_ios_fill_b: "Заповнити прозорість фоном для iPhone (iOS) <small>※Рекомендовано для головного екрана iOS</small>",
    btn_export_ios: "<strong>Для iPhone</strong><small>apple-touch-icon (180×180)</small>",
    btn_export_android192: "<strong>Для Android</strong><small>PWA Стандарт (192×192)</small>",
    btn_export_android512: "<strong>Android Висока якість</strong><small>PWA Splash (512×512)</small>",
    btn_export_ico: "<strong>Windows / Web</strong><small>favicon.ico (Мультирозмір)</small>",
    btn_export_png_a: "<strong>Стандартний PNG</strong><small>imp_canvas.png (256×256)</small>",
    btn_export_png_b: "<strong>Стандартний PNG</strong><small>imp_image.png (256×256)</small>",
    btn_export_zip: "<strong>Повний ZIP-архів</strong><small>iOS + Android + Favicon + Маніфест</small>",
    drop_zone_title: "Перетягніть зображення сюди",
    drop_zone_desc: "або натисніть для вибору файлу (PNG, JPG, WEBP, SVG)",
    btn_select_file: "Обрати файл",
    sample_gallery_title: "💡 Безкоштовні оригінальні зразки (Натисніть для завантаження)",
    sample_gallery_loc: "Розташування",
    sample_icon_01: "Папка",
    sample_icon_02: "ПК / Монітор",
    sample_icon_03: "Кошик",
    sample_icon_04: "Документ",
    sample_icon_05: "Налаштування",
    sample_icon_06: "Пакет",
    sample_icon_07: "Браузер",
    sample_icon_08: "Камера",
    sample_icon_09: "Музика",
    sample_icon_10: "Термінал",
    lbl_fit_mode: "Формат припасування:",
    opt_fit_cover: "Обрізка по центру (Заповнити квадрат - Рекомендовано)",
    opt_fit_contain: "Вмістити повністю (Зберегти пропорції)",
    opt_fit_stretch: "Розтягнути (Розтягнути до 256×256)",
    lbl_upload_bg: "Поля / Колір фону:",
    btn_send_to_canvas: "🎨 Перенести на полотно для малювання та редагування",
    upload_no_file: "Не вибрано (Оберіть зображення)",
    snippet_title: "📋 Код для вебдодатка та PWA",
    btn_copy_code: "📋 Копіювати код",
    btn_copied_code: "✅ Скопійовано!",
    snippet_desc: "Розмістіть файли іконок у корені сайту та вставте ці теги в <code>&lt;head&gt;</code> вашого HTML.",
    btn_refresh_tip: "Завантажити останню версію",
    btn_check_update: "🔄 Перевірити оновлення",
    update_available: "Доступна нова версія!",
    btn_update_now: "Оновити зараз",
    toast_checking_update: "🔄 Перевірка оновлень...",
    toast_latest_version: "✅ Ви використовуєте найновішу версію",
    toast_updating: "🚀 Оновлення до останньої версії..."
  },
  id: {
    prompt_start: "Tekan sembarang tombol atau ketuk untuk mulai",
    app_subtitle: "Pembuat ikon multi-platform untuk iOS, Android & Windows",
    tab_canvas: "A: Gambar di Kanvas",
    tab_upload: "B: Unggah Gambar",
    back_to_opening: "← Kembali ke Awal",
    back_to_lock: "← Kembali",
    info_page_title: "Informasi",
    info_created_by: "Aplikasi ini dibuat oleh <strong>H.Fukazu</strong>.",
    info_version: "Versi: ",
    info_updated_date: "(Diperbarui: 10/10/2026)",
    info_initial_release: "Rilis Awal: ",
    show_copyright: "📖 Lihat Informasi Hak Cipta",
    hide_copyright: "📖 Tutup Informasi Hak Cipta",
    back_to_top: "↑ TOP",
    layer_panel_title: "Daftar Lapisan",
    layer_drag_hint: "Tarik untuk mengatur ulang",
    layer_empty_msg: "Belum ada lapisan<br>Gambar di kanvas untuk menambahkan",
    layer_delete_tip: "Hapus lapisan ini",
    layer_rect: "Persegi Panjang",
    layer_circle: "Lingkaran",
    layer_line: "Garis",
    layer_pen: "Pena",
    layer_eraser: "Penghapus",
    layer_image: "Gambar",
    toast_layer_deleted: "🗑 Lapisan dihapus",
    toast_undo: "↩ Dibatalkan",
    toast_redo: "↪ Diulang",
    confirm_clear: "Bersihkan kanvas? (Dapat dipulihkan dengan Urungkan)",
    toast_clear: "🗑 Kanvas dibersihkan",
    lbl_tool: "Alat",
    tool_pen: "✏️ Pena",
    tool_eraser: "🧹 Penghapus",
    tool_line: "📏 Garis",
    tool_rect: "▢ Persegi (Garis)",
    tool_rect_fill: "■ Persegi (Isi)",
    tool_circle: "◯ Lingkaran (Garis)",
    tool_circle_fill: "● Lingkaran (Isi)",
    tool_text: "🔤 Teks",
    tool_fill: "🪣 Ember Cat",
    lbl_pen_color: "Warna Gambar",
    lbl_pen_size: "Ketebalan",
    lbl_font_size: "Ukuran Font",
    lbl_font_family: "Font",
    font_gothic: "Gotik (Sans Modern)",
    font_round: "Bulat (Ramah)",
    font_mincho: "Serif (Elegan)",
    font_brush: "Kaligrafi (Kuas)",
    font_impact: "Impact (Tebal)",
    font_hand: "Tulisan Tangan (Skrip)",
    font_mono: "Monospace (Kode)",
    font_classic: "Klasik (Georgia)",
    lbl_canvas_bg: "Latar Belakang Kanvas",
    bg_transparent: "Transparan (Kotak-kotak)",
    bg_black: "Hitam (#000000)",
    bg_white: "Putih (#ffffff)",
    bg_navy: "Biru Dongker (#0A0F1F)",
    btn_select_transform: "✋ Pilih / Transformasi",
    btn_rotate_90: "90°",
    btn_rotate_90_tip: "Putar 90° searah jarum jam",
    btn_undo: "↩ Urungkan",
    btn_redo: "↪ Ulangi",
    btn_clear: "🗑 Bersihkan",
    tab_fx_color: "🎨 Gaya Isi (Solid / Gradasi)",
    tab_fx_shadow: "🌑 Bayangan 3D",
    tab_fx_gloss: "✨ Kilau 3D / Gloss",
    tab_fx_filter: "🧪 Filter (Opasitas/Blur/Ketajaman)",
    lbl_layer_opacity: "Opasitas",
    lbl_layer_blur: "Blur (Kabur)",
    lbl_layer_sharpen: "Ketajaman",
    lbl_solid: "Solid",
    lbl_gradient: "Gradasi",
    lbl_grad_c1: "Warna Awal",
    lbl_grad_c2: "Warna Akhir",
    lbl_grad_dir: "Arah",
    opt_dir_bottom: "Atas ke Bawah ↓",
    opt_dir_right: "Kiri ke Kanan →",
    opt_dir_bottom_right: "Diagonal ↘",
    opt_dir_radial: "Radial ⊙",
    lbl_preset: "Preset:",
    lbl_shadow_enable: "Aktifkan Bayangan",
    lbl_shadow_blur: "Blur",
    lbl_shadow_offset: "Jarak / Kedalaman",
    lbl_shadow_angle: "Sudut",
    lbl_shadow_color: "Warna Bayangan",
    lbl_shadow_opacity: "Transparansi",
    lbl_gloss_enable: "Aktifkan Kilau",
    lbl_gloss_type: "Gaya Tekstur",
    opt_gloss_dome: "Kubah Kaca (Kilau Atas)",
    opt_gloss_bevel: "Bevel 3D (Tepi Timbul)",
    opt_gloss_glow: "Neon Glow (Kilau Dalam)",
    lbl_gloss_intensity: "Intensitas Kilau",
    export_title_a: "📥 Simpan Ikon (Kanvas)",
    export_title_b: "📥 Simpan Ikon (Gambar Unggahan)",
    badge_save_location: "📁 Bisa pilih folder",
    lbl_ios_fill_a: "Isi transparansi dengan latar belakang untuk iPhone (iOS) <small>※Disarankan karena iOS mengubah jadi hitam</small>",
    lbl_ios_fill_b: "Isi transparansi dengan latar belakang untuk iPhone (iOS) <small>※Disarankan untuk Layar Utama iOS</small>",
    btn_export_ios: "<strong>Untuk iPhone</strong><small>apple-touch-icon (180×180)</small>",
    btn_export_android192: "<strong>Untuk Android</strong><small>PWA Standar (192×192)</small>",
    btn_export_android512: "<strong>Android HD</strong><small>PWA Splash (512×512)</small>",
    btn_export_ico: "<strong>Windows / Web</strong><small>favicon.ico (Multi-ukuran)</small>",
    btn_export_png_a: "<strong>PNG Standar</strong><small>imp_canvas.png (256×256)</small>",
    btn_export_png_b: "<strong>PNG Standar</strong><small>imp_image.png (256×256)</small>",
    btn_export_zip: "<strong>Paket ZIP Lengkap</strong><small>iOS + Android + Favicon + Manifest</small>",
    drop_zone_title: "Tarik & Lepas gambar ke sini",
    drop_zone_desc: "atau klik untuk memilih file (Mendukung PNG, JPG, WEBP, SVG)",
    btn_select_file: "Pilih File",
    sample_gallery_title: "💡 Sampel Asli Bebas Hak Cipta (Klik untuk memuat)",
    sample_gallery_loc: "Lokasi",
    sample_icon_01: "Folder",
    sample_icon_02: "PC / Layar",
    sample_icon_03: "Tempat Sampah",
    sample_icon_04: "Dokumen",
    sample_icon_05: "Pengaturan",
    sample_icon_06: "Paket",
    sample_icon_07: "Browser",
    sample_icon_08: "Kamera",
    sample_icon_09: "Musik",
    sample_icon_10: "Terminal",
    lbl_fit_mode: "Mode Pas:",
    opt_fit_cover: "Potong Tengah (Isi Kotak - Disarankan)",
    opt_fit_contain: "Muat Semua (Pertahankan Rasio)",
    opt_fit_stretch: "Regangkan (Sesuaikan ke 256×256)",
    lbl_upload_bg: "Margin / Latar Belakang:",
    btn_send_to_canvas: "🎨 Transfer ke Kanvas untuk Menggambar & Mengedit",
    upload_no_file: "Belum dipilih (Silakan pilih gambar)",
    snippet_title: "📋 Kode untuk Aplikasi Web & PWA",
    btn_copy_code: "📋 Salin Kode",
    btn_copied_code: "✅ Tersalin!",
    snippet_desc: "Tempatkan file ikon di folder utama situs dan tempel tag ini di dalam <code>&lt;head&gt;</code> HTML.",
    btn_refresh_tip: "Muat versi terbaru",
    btn_check_update: "🔄 Periksa Pembaruan",
    update_available: "Versi baru telah tersedia!",
    btn_update_now: "Perbarui Sekarang",
    toast_checking_update: "🔄 Memeriksa pembaruan...",
    toast_latest_version: "✅ Anda menggunakan versi terbaru",
    toast_updating: "🚀 Memperbarui ke versi terbaru..."
  },
  ko: {
    prompt_start: "키를 누르거나 화면을 탭하여 시작",
    app_subtitle: "iOS / Android / Windows 멀티 플랫폼 아이콘 제작 툴",
    tab_canvas: "A: 캔버스에 그리기",
    tab_upload: "B: 이미지 업로드",
    back_to_opening: "← 시작 화면으로 돌아가기",
    back_to_lock: "← 이전 화면으로",
    info_page_title: "Information",
    info_created_by: "이 앱은 <strong>H.Fukazu</strong>에 의해 제작되었습니다.",
    info_version: "버전: ",
    info_updated_date: "(2026/10/10 업데이트)",
    info_initial_release: "초판 출시: ",
    show_copyright: "📖 저작권 정보 보기",
    hide_copyright: "📖 저작권 정보 닫기",
    back_to_top: "↑ TOP",
    layer_panel_title: "레이어 목록",
    layer_drag_hint: "드래그하여 순서 변경",
    layer_empty_msg: "레이어가 없습니다<br>캔버스에 그리면 추가됩니다",
    layer_delete_tip: "이 레이어 삭제",
    layer_rect: "사각형",
    layer_circle: "원",
    layer_line: "직선",
    layer_pen: "펜",
    layer_eraser: "지우개",
    layer_image: "이미지",
    toast_layer_deleted: "🗑 레이어를 삭제했습니다",
    toast_undo: "↩ 실행 취소되었습니다",
    toast_redo: "↪ 다시 실행되었습니다",
    confirm_clear: "캔버스를 지우시겠습니까? (실행 취소로 복원 가능)",
    toast_clear: "🗑 캔버스가 지워졌습니다",
    lbl_tool: "도구",
    tool_pen: "✏️ 펜",
    tool_eraser: "🧹 지우개",
    tool_line: "📏 직선",
    tool_rect: "▢ 사각형 (외곽선)",
    tool_rect_fill: "■ 사각형 (채우기)",
    tool_circle: "◯ 원 (외곽선)",
    tool_circle_fill: "● 원 (채우기)",
    tool_text: "🔤 텍스트",
    tool_fill: "🪣 페인트통 채우기",
    lbl_pen_color: "그리기 색상",
    lbl_pen_size: "굵기",
    lbl_font_size: "글자 크기",
    lbl_font_family: "글꼴",
    font_gothic: "고딕 (모던 산세리프)",
    font_round: "둥근 고딕 (친근함)",
    font_mincho: "명조체 (우아함)",
    font_brush: "붓글씨 (캘리그래피)",
    font_impact: "임팩트 (굵은 글씨)",
    font_hand: "손글씨 (스크립트)",
    font_mono: "고정폭 (코드)",
    font_classic: "클래식 (Georgia)",
    lbl_canvas_bg: "캔버스 배경",
    bg_transparent: "투명 (체커보드)",
    bg_black: "검정 (#000000)",
    bg_white: "흰색 (#ffffff)",
    bg_navy: "네이비 (#0A0F1F)",
    btn_select_transform: "✋ 선택 / 변형",
    btn_rotate_90: "90°",
    btn_rotate_90_tip: "시계 방향으로 90도 회전",
    btn_undo: "↩ 실행 취소",
    btn_redo: "↪ 다시 실행",
    btn_clear: "🗑 지우기",
    tab_fx_color: "🎨 채우기 스타일 (단색 / 그라데이션)",
    tab_fx_shadow: "🌑 3D 그림자",
    tab_fx_gloss: "✨ 3D 광택 / 입체감",
    tab_fx_filter: "🧪 필터 (투명도/블러/선명화)",
    lbl_layer_opacity: "투명도 (불투명도)",
    lbl_layer_blur: "블러 (흐림)",
    lbl_layer_sharpen: "선명화 (샤픈)",
    lbl_solid: "단색",
    lbl_gradient: "그라데이션",
    lbl_grad_c1: "시작 색상",
    lbl_grad_c2: "끝 색상",
    lbl_grad_dir: "방향",
    opt_dir_bottom: "위에서 아래로 ↓",
    opt_dir_right: "왼쪽에서 오른쪽으로 →",
    opt_dir_bottom_right: "대각선 ↘",
    opt_dir_radial: "원형 방사 ⊙",
    lbl_preset: "프리셋:",
    lbl_shadow_enable: "그림자 적용",
    lbl_shadow_blur: "흐림 정도",
    lbl_shadow_offset: "거리 / 깊이",
    lbl_shadow_angle: "각도",
    lbl_shadow_color: "그림자 색상",
    lbl_shadow_opacity: "불투명도",
    lbl_gloss_enable: "광택 적용",
    lbl_gloss_type: "스타일",
    opt_gloss_dome: "글래스 돔 (상단 하이라이트)",
    opt_gloss_bevel: "3D 베벨 (양각 입체 엣지)",
    opt_gloss_glow: "네온 글로우 (이너 발광)",
    lbl_gloss_intensity: "광택 강도",
    export_title_a: "📥 아이콘 저장 (캔버스)",
    export_title_b: "📥 아이콘 저장 (업로드 이미지)",
    badge_save_location: "📁 저장 폴더 지정 가능",
    lbl_ios_fill_a: "iPhone(iOS)용 투명 영역 배경색으로 채우기 <small>※iOS 홈 화면은 투명을 검정으로 표시하므로 권장</small>",
    lbl_ios_fill_b: "iPhone(iOS)용 투명 영역 배경색으로 채우기 <small>※iOS 홈 화면 권장</small>",
    btn_export_ios: "<strong>iPhone용</strong><small>apple-touch-icon (180×180)</small>",
    btn_export_android192: "<strong>Android용</strong><small>PWA 표준 (192×192)</small>",
    btn_export_android512: "<strong>Android 고화질</strong><small>PWA 스플래시 (512×512)</small>",
    btn_export_ico: "<strong>Windows / Web</strong><small>favicon.ico (멀티 사이즈)</small>",
    btn_export_png_a: "<strong>표준 PNG</strong><small>imp_canvas.png (256×256)</small>",
    btn_export_png_b: "<strong>표준 PNG</strong><small>imp_image.png (256×256)</small>",
    btn_export_zip: "<strong>전체 사이즈 일괄 ZIP</strong><small>iOS + Android + Favicon + 매니페스트</small>",
    drop_zone_title: "이미지를 여기에 드래그 앤 드롭",
    drop_zone_desc: "또는 클릭하여 이미지 선택 (PNG, JPG, WEBP, SVG 지원)",
    btn_select_file: "파일 선택하기",
    sample_gallery_title: "💡 저작권 프리 오리지널 샘플 (클릭하여 로드)",
    sample_gallery_loc: "저장 위치",
    sample_icon_01: "폴더",
    sample_icon_02: "PC / 모니터",
    sample_icon_03: "휴지통",
    sample_icon_04: "문서",
    sample_icon_05: "설정",
    sample_icon_06: "패키지",
    sample_icon_07: "브라우저",
    sample_icon_08: "카메라",
    sample_icon_09: "음악",
    sample_icon_10: "터미널",
    lbl_fit_mode: "맞춤 형식:",
    opt_fit_cover: "중앙 트리밍 (정사각형 채우기 - 권장)",
    opt_fit_contain: "전체 맞춤 (비율 유지)",
    opt_fit_stretch: "늘이기 (256×256에 늘림)",
    lbl_upload_bg: "여백 / 배경색:",
    btn_send_to_canvas: "🎨 캔버스로 전송하여 그리기 및 편집",
    upload_no_file: "선택되지 않음 (이미지를 선택하세요)",
    snippet_title: "📋 웹 앱 및 PWA 삽입용 코드",
    btn_copy_code: "📋 코드 복사",
    btn_copied_code: "✅ 복사 완료!",
    snippet_desc: "생성된 아이콘 파일을 사이트 루트에 두고 HTML <code>&lt;head&gt;</code> 안에 태그를 붙여넣기만 하면 됩니다.",
    btn_refresh_tip: "최신 버전 불러오기",
    btn_check_update: "🔄 최신 버전 확인",
    update_available: "새로운 버전이 출시되었습니다!",
    btn_update_now: "지금 업데이트",
    toast_checking_update: "🔄 최신 버전 확인 중...",
    toast_latest_version: "✅ 현재 최신 버전을 사용 중입니다",
    toast_updating: "🚀 최신 버전으로 업데이트 중..."
  },
  tr: {
    prompt_start: "Başlamak için bir tuşa basın veya dokunun",
    app_subtitle: "iOS, Android ve Windows için Çok Platformlu Simge Stüdyosu",
    tab_canvas: "A: Tuvalde Çiz",
    tab_upload: "B: Resim Yükle",
    back_to_opening: "← Başlangıç Ekranına Dön",
    back_to_lock: "← Geri Dön",
    info_page_title: "Bilgi",
    info_created_by: "Bu uygulama <strong>H.Fukazu</strong> tarafından oluşturulmuştur.",
    info_version: "Sürüm: ",
    info_updated_date: "(Güncellendi: 10.10.2026)",
    info_initial_release: "İlk Sürüm: ",
    show_copyright: "📖 Telif Hakkı Bilgilerini Görüntüle",
    hide_copyright: "📖 Telif Hakkı Bilgilerini Kapat",
    back_to_top: "↑ TOP",
    layer_panel_title: "Katman Listesi",
    layer_drag_hint: "Yeniden sıralamak için sürükleyin",
    layer_empty_msg: "Henüz katman yok<br>Eklemek için tuvale çizin",
    layer_delete_tip: "Bu katmanı sil",
    layer_rect: "Dikdörtgen",
    layer_circle: "Daire",
    layer_line: "Çizgi",
    layer_pen: "Kalem",
    layer_eraser: "Silgi",
    layer_image: "Resim",
    toast_layer_deleted: "🗑 Katman silindi",
    toast_undo: "↩ Geri alındı",
    toast_redo: "↪ Yinelendi",
    confirm_clear: "Tuval temizlensin mi? (Geri Al ile geri yükleyebilirsiniz)",
    toast_clear: "🗑 Tuval temizlendi",
    lbl_tool: "Araç",
    tool_pen: "✏️ Kalem",
    tool_eraser: "🧹 Silgi",
    tool_line: "📏 Çizgi",
    tool_rect: "▢ Dikdörtgen (Kenarlık)",
    tool_rect_fill: "■ Dikdörtgen (Dolu)",
    tool_circle: "◯ Daire (Kenarlık)",
    tool_circle_fill: "● Daire (Dolu)",
    tool_text: "🔤 Metin",
    tool_fill: "🪣 Boya Kovası",
    lbl_pen_color: "Çizim Rengi",
    lbl_pen_size: "Kalınlık",
    lbl_font_size: "Yazı Boyutu",
    lbl_font_family: "Yazı Tipi",
    font_gothic: "Gotik (Modern Sans)",
    font_round: "Yuvarlak (Sevimli)",
    font_mincho: "Serif (Zarif)",
    font_brush: "Kaligrafi (Fırça)",
    font_impact: "Impact (Kalın)",
    font_hand: "El Yazısı (Script)",
    font_mono: "Eş Aralıklı (Kod)",
    font_classic: "Klasik (Georgia)",
    lbl_canvas_bg: "Tuval Arka Planı",
    bg_transparent: "Şeffaf (Dama)",
    bg_black: "Siyah (#000000)",
    bg_white: "Beyaz (#ffffff)",
    bg_navy: "Lacivert (#0A0F1F)",
    btn_select_transform: "✋ Seç / Dönüştür",
    btn_rotate_90: "90°",
    btn_rotate_90_tip: "Saat yönünde 90° döndür",
    btn_undo: "↩ Geri Al",
    btn_redo: "↪ Yinele",
    btn_clear: "🗑 Temizle",
    tab_fx_color: "🎨 Dolgu Stili (Tek Renk / Gradyan)",
    tab_fx_shadow: "🌑 3D Gölge",
    tab_fx_gloss: "✨ 3D Parlaklık / Cila",
    tab_fx_filter: "🧪 Filtre (Opaklık/Bulanıklık/Keskinlik)",
    lbl_layer_opacity: "Opaklık",
    lbl_layer_blur: "Bulanıklık",
    lbl_layer_sharpen: "Keskinleştirme",
    lbl_solid: "Tek Renk",
    lbl_gradient: "Gradyan",
    lbl_grad_c1: "Başlangıç Rengi",
    lbl_grad_c2: "Bitiş Rengi",
    lbl_grad_dir: "Yön",
    opt_dir_bottom: "Yukarıdan Aşağıya ↓",
    opt_dir_right: "Soldan Sağa →",
    opt_dir_bottom_right: "Çapraz ↘",
    opt_dir_radial: "Dairesel ⊙",
    lbl_preset: "Hazır Ayarlar:",
    lbl_shadow_enable: "Gölgeyi Etkinleştir",
    lbl_shadow_blur: "Bulanıklık",
    lbl_shadow_offset: "Mesafe / Derinlik",
    lbl_shadow_angle: "Açı",
    lbl_shadow_color: "Gölge Rengi",
    lbl_shadow_opacity: "Opaklık",
    lbl_gloss_enable: "Parlaklığı Etkinleştir",
    lbl_gloss_type: "Doku Stili",
    opt_gloss_dome: "Cam Kubbe (Üst Vurgu)",
    opt_gloss_bevel: "3D Eğim (Kabartma Kenar)",
    opt_gloss_glow: "Neon Parıltı (İç Işıma)",
    lbl_gloss_intensity: "Parlaklık Yoğunluğu",
    export_title_a: "📥 Simgeleri Kaydet (Tuval)",
    export_title_b: "📥 Simgeleri Kaydet (Yüklenen Resim)",
    badge_save_location: "📁 Klasör seçimi mevcut",
    lbl_ios_fill_a: "iPhone (iOS) için şeffaflığı arka plan rengiyle doldur <small>※iOS şeffaflığı siyaha çevirdiğinden önerilir</small>",
    lbl_ios_fill_b: "iPhone (iOS) için şeffaflığı arka plan rengiyle doldur <small>※iOS Ana Ekranı için önerilir</small>",
    btn_export_ios: "<strong>iPhone İçin</strong><small>apple-touch-icon (180×180)</small>",
    btn_export_android192: "<strong>Android İçin</strong><small>PWA Standart (192×192)</small>",
    btn_export_android512: "<strong>Android Yüksek Çöz</strong><small>PWA Splash (512×512)</small>",
    btn_export_ico: "<strong>Windows / Web</strong><small>favicon.ico (Çoklu Boyut)</small>",
    btn_export_png_a: "<strong>Standart PNG</strong><small>imp_canvas.png (256×256)</small>",
    btn_export_png_b: "<strong>Standart PNG</strong><small>imp_image.png (256×256)</small>",
    btn_export_zip: "<strong>Tüm Boyutlar ZIP</strong><small>iOS + Android + Favicon + Manifest</small>",
    drop_zone_title: "Resmi buraya sürükleyip bırakın",
    drop_zone_desc: "veya dosya seçmek için tıklayın (PNG, JPG, WEBP, SVG desteklenir)",
    btn_select_file: "Dosya Seç",
    sample_gallery_title: "💡 Telifsiz Orijinal Örnekler (Yüklemek için tıklayın)",
    sample_gallery_loc: "Konum",
    sample_icon_01: "Klasör",
    sample_icon_02: "PC / Ekran",
    sample_icon_03: "Geri Dönüşüm",
    sample_icon_04: "Belge",
    sample_icon_05: "Ayarlar",
    sample_icon_06: "Paket",
    sample_icon_07: "Tarayıcı",
    sample_icon_08: "Kamera",
    sample_icon_09: "Müzik",
    sample_icon_10: "Terminal",
    lbl_fit_mode: "Sığdırma Modu:",
    opt_fit_cover: "Ortadan Kırp (Kareyi doldur - Önerilen)",
    opt_fit_contain: "Tümünü Sığdır (Oranı koru)",
    opt_fit_stretch: "Uzat (256×256 boyutuna esnet)",
    lbl_upload_bg: "Kenar Boşluğu / Arka Plan:",
    btn_send_to_canvas: "🎨 Çizmek ve düzenlemek için tuvale aktar",
    upload_no_file: "Seçilmedi (Lütfen bir resim seçin)",
    snippet_title: "📋 Web Uygulaması ve PWA Kodu",
    btn_copy_code: "📋 Kodu Kopyala",
    btn_copied_code: "✅ Kopyalandı!",
    snippet_desc: "Simge dosyalarını sitenizin kök dizinine yerleştirin ve HTML <code>&lt;head&gt;</code> içine yapıştırın.",
    btn_refresh_tip: "En son sürümü yükle",
    btn_check_update: "🔄 Güncellemeleri Denetle",
    update_available: "Yeni bir sürüm mevcut!",
    btn_update_now: "Şimdi Güncelle",
    toast_checking_update: "🔄 Güncellemeler denetleniyor...",
    toast_latest_version: "✅ En son sürümü kullanıyorsunuz",
    toast_updating: "🚀 En son sürüme güncelleniyor..."
  }
};

let currentLanguage = 'ja';
try {
  const saved = localStorage.getItem('imp_language');
  if (saved && i18nData[saved]) {
    currentLanguage = saved;
  }
} catch (e) {}

function setLanguage(lang) {
  if (!i18nData[lang]) lang = 'ja';
  currentLanguage = lang;
  try {
    localStorage.setItem('imp_language', lang);
  } catch (e) {}

  trackEvent('change_language', { language: lang });

  // すべての言語セレクターの値を同期
  const selectors = document.querySelectorAll('.lang-selector');
  selectors.forEach(sel => {
    sel.value = lang;
  });

  // data-i18n 要素を更新
  const dict = i18nData[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict && dict[key] !== undefined) {
      el.innerHTML = dict[key];
    }
  });

  // data-i18n-title 属性の要素（ツールチップ）を更新
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (dict && dict[key] !== undefined) {
      el.title = dict[key];
    }
  });

  // レイヤー一覧の動的ラベルも即座に再描画
  if (typeof updateLayerPanel === 'function') {
    updateLayerPanel();
  }

  // HTML lang 属性更新
  document.documentElement.lang = lang;
}
window.setLanguage = setLanguage;

// ==========================================
// 0. アプリ オープニング画面 (Splash Screen) 制御
// ==========================================
const openingScreen = document.getElementById('openingScreen');
const openingInfoBtn = document.getElementById('openingInfoBtn');
let isOpeningActive = true;

// フォント（Outfit等）の完全ロード完了を待機（フォント切り替わりのガタつきを100%防止）
if (document.fonts) {
  document.fonts.ready.then(() => {
    document.documentElement.classList.add('fonts-ready');
  });
} else {
  document.documentElement.classList.add('fonts-ready');
}
setTimeout(() => {
  document.documentElement.classList.add('fonts-ready');
}, 500);

function closeOpeningScreen() {
  if (!isOpeningActive || !openingScreen) return;
  isOpeningActive = false;
  openingScreen.classList.add('hidden');
  const welcomeMsg = currentLanguage === 'ja' ? "🚀 IMP (Icon Maker Pro) へようこそ！" : "🚀 Welcome to IMP (Icon Maker Pro)!";
  showToast(welcomeMsg);
  trackEvent('app_start', { language: currentLanguage });
}

if (openingScreen) {
  // 画面クリック / タップで開始
  openingScreen.addEventListener('click', (e) => {
    if (e.target.closest('.opening-header-right') || e.target.closest('#openingInfoBtn')) {
      return;
    }
    closeOpeningScreen();
  });

  // キーボードの任意のキーで開始 (Press Any Key to Start)
  window.addEventListener('keydown', (e) => {
    const infoPage = document.getElementById('informationPage');
    if (infoPage && infoPage.style.display !== 'none') {
      return; // Information画面表示中は開始しない
    }
    if (isOpeningActive) {
      closeOpeningScreen();
    }
  });
}

// 起動画面（オープニング）に戻る処理
function backToOpeningScreen() {
  if (!openingScreen) return;
  openingScreen.classList.remove('hidden');
  isOpeningActive = true;
  const logoWrapper = document.querySelector('.opening-logo-wrapper');
  if (logoWrapper) {
    const clone = logoWrapper.cloneNode(true);
    logoWrapper.parentNode.replaceChild(clone, logoWrapper);
  }
  const prompt = document.getElementById('openingStartPrompt');
  if (prompt) {
    const cloneP = prompt.cloneNode(true);
    prompt.parentNode.replaceChild(cloneP, prompt);
  }
}
window.backToOpeningScreen = backToOpeningScreen;

// ==========================================
// Information 画面 制御
// ==========================================
let lastScreenBeforeInfo = 'opening';

function openInformationPage(fromScreen = 'opening') {
  lastScreenBeforeInfo = fromScreen;
  trackEvent('view_information', { from: fromScreen });
  const infoPage = document.getElementById('informationPage');
  if (infoPage) {
    infoPage.style.display = 'flex';
    const scrollBody = infoPage.querySelector('.info-scroll-body');
    if (scrollBody) scrollBody.scrollTop = 0;
    const topBtn = document.getElementById('readmeScrollToTopBtn');
    if (topBtn) topBtn.classList.remove('show-floating');
  }
}
window.openInformationPage = openInformationPage;

function closeInformationPage() {
  const infoPage = document.getElementById('informationPage');
  if (infoPage) {
    infoPage.style.display = 'none';
  }
}
window.closeInformationPage = closeInformationPage;
window.backToLockScreen = closeInformationPage; // 互換性エイリアス

let isReadmeVisible = false;
function showReadmePageFromInfo() {
  const container = document.getElementById('readmeBodyContainer');
  const btn = document.getElementById('showCopyrightBtn');
  if (!container) return;

  isReadmeVisible = !isReadmeVisible;
  if (isReadmeVisible) {
    container.style.display = 'block';
    if (btn) {
      const dict = i18nData[currentLanguage] || i18nData.ja;
      btn.innerHTML = dict.hide_copyright || "📖 著作権情報を閉じる";
    }

    // 現在の選択言語のセクションをハイライトしてスクロール
    const targetSecId = 'sec-' + currentLanguage;
    document.querySelectorAll('.readme-section').forEach(sec => sec.classList.remove('active-lang-section'));
    const targetSec = document.getElementById(targetSecId);
    if (targetSec) {
      targetSec.classList.add('active-lang-section');
      setTimeout(() => {
        targetSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  } else {
    container.style.display = 'none';
    if (btn) {
      const dict = i18nData[currentLanguage] || i18nData.ja;
      btn.innerHTML = dict.show_copyright || "📖 著作権情報を見る";
    }
  }
}
window.showReadmePageFromInfo = showReadmePageFromInfo;
window.toggleReadmePageFromInfo = showReadmePageFromInfo;

function scrollToTopReadme() {
  const scrollBody = document.querySelector('.info-scroll-body');
  if (scrollBody) {
    scrollBody.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
window.scrollToTopReadme = scrollToTopReadme;

// Information画面のスクロール監視（下にスクロールされたら左下にフッとTOPボタンが出現）
const infoScrollBodyElement = document.querySelector('.info-scroll-body');
const readmeTopBtnElement = document.getElementById('readmeScrollToTopBtn');
if (infoScrollBodyElement && readmeTopBtnElement) {
  infoScrollBodyElement.addEventListener('scroll', () => {
    if (infoScrollBodyElement.scrollTop > 120) {
      readmeTopBtnElement.classList.add('show-floating');
    } else {
      readmeTopBtnElement.classList.remove('show-floating');
    }
  });
}

// Informationボタンクリック
if (openingInfoBtn) {
  openingInfoBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openInformationPage('opening');
  });
}

// ヘッダーロゴクリックでいつでもオープニングを再再生
const appLogoContainer = document.querySelector('.logo-container');
if (appLogoContainer) {
  appLogoContainer.style.cursor = 'pointer';
  appLogoContainer.title = "🎬 オープニングアニメーションを再生";
  appLogoContainer.addEventListener('click', () => {
    if (openingScreen) {
      openingScreen.classList.remove('hidden');
      isOpeningActive = true;
      const logoWrapper = document.querySelector('.opening-logo-wrapper');
      if (logoWrapper) {
        const clone = logoWrapper.cloneNode(true);
        logoWrapper.parentNode.replaceChild(clone, logoWrapper);
      }
      const prompt = document.getElementById('openingStartPrompt');
      if (prompt) {
        const cloneP = prompt.cloneNode(true);
        prompt.parentNode.replaceChild(cloneP, prompt);
      }
    }
  });
}

// ==========================================
// 1. モード切替タブ制御
// ==========================================
const tabCanvas = document.getElementById('tabCanvas');
const tabUpload = document.getElementById('tabUpload');
const canvasMode = document.getElementById('canvasMode');
const uploadMode = document.getElementById('uploadMode');

function setMode(mode) {
  trackEvent('switch_mode', { mode: mode });
  if (mode === 'canvas') {
    tabCanvas.classList.add('active');
    tabUpload.classList.remove('active');
    canvasMode.classList.remove('hidden');
    uploadMode.classList.add('hidden');
  } else {
    tabUpload.classList.add('active');
    tabCanvas.classList.remove('active');
    canvasMode.classList.add('hidden');
    uploadMode.classList.remove('hidden');
  }
}

tabCanvas.addEventListener('click', () => setMode('canvas'));
tabUpload.addEventListener('click', () => setMode('upload'));

// ==========================================
// 2. レイヤー管理 & 履歴（戻す / やり直し / クリア）
// ==========================================
let objects = [];
let undoStack = [];
let redoStack = [];
let selectedObject = null;

const undoButton = document.getElementById('undoButton');
const redoButton = document.getElementById('redoButton');
const clearCanvasBtn = document.getElementById('clearCanvas');

function updateHistoryButtons() {
  if (undoButton) undoButton.disabled = (undoStack.length === 0);
  if (redoButton) redoButton.disabled = (redoStack.length === 0);
}

function serializeObjects(objs) {
  return JSON.stringify(objs.map(obj => {
    if (obj.type === 'image' && obj.imgElement) {
      return {
        ...obj,
        imgElement: null // 循環・非シリアライズ参照を除去
      };
    }
    return obj;
  }));
}

function deserializeObjects(jsonString) {
  const parsed = JSON.parse(jsonString);
  return parsed.map(obj => {
    if (obj.type === 'image' && obj.dataUrl) {
      const img = new Image();
      img.src = obj.dataUrl;
      obj.imgElement = img;
    }
    return obj;
  });
}

function saveState() {
  undoStack.push(serializeObjects(objects));
  redoStack = [];
  // 履歴スタック上限（メモリ保護）
  if (undoStack.length > 50) undoStack.shift();
  updateHistoryButtons();
}

function undo() {
  if (undoStack.length === 0) return;
  redoStack.push(serializeObjects(objects));
  objects = deserializeObjects(undoStack.pop());
  selectedObject = null;
  updateHistoryButtons();
  redraw();
  const dict = i18nData[currentLanguage] || i18nData.ja;
  showToast(dict.toast_undo || "↩ 1つ前の状態に戻しました");
}

function redo() {
  if (redoStack.length === 0) return;
  undoStack.push(serializeObjects(objects));
  objects = deserializeObjects(redoStack.pop());
  selectedObject = null;
  updateHistoryButtons();
  redraw();
  const dict = i18nData[currentLanguage] || i18nData.ja;
  showToast(dict.toast_redo || "↪ やり直しました");
}

function clearAll() {
  if (objects.length === 0) return;
  const dict = i18nData[currentLanguage] || i18nData.ja;
  if (confirm(dict.confirm_clear || "キャンバスの内容をクリアしますか？（「戻す」で復元できます）")) {
    saveState();
    objects = [];
    selectedObject = null;
    redraw();
    showToast(dict.toast_clear || "🗑 キャンバスをクリアしました");
  }
}

undoButton.addEventListener('click', undo);
redoButton.addEventListener('click', redo);
clearCanvasBtn.addEventListener('click', clearAll);

// ショートカットキー対応 (Ctrl+Z, Ctrl+Y / Cmd+Z, Cmd+Shift+Z)
window.addEventListener('keydown', (e) => {
  // テキスト入力中は除外
  if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return;

  const isCmdOrCtrl = e.ctrlKey || e.metaKey;
  if (!isCmdOrCtrl) return;

  if (e.key === 'z' || e.key === 'Z') {
    e.preventDefault();
    if (e.shiftKey) {
      redo();
    } else {
      undo();
    }
  } else if (e.key === 'y' || e.key === 'Y') {
    e.preventDefault();
    redo();
  }
});

// ==========================================
// 3. キャンバス描画制御（Mode A）
// ==========================================
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let drawing = false;
let startX = 0, startY = 0;

const toolSelect = document.getElementById('toolSelect');
const penColorInput = document.getElementById('penColor');
const colorHexLabel = document.getElementById('colorHexLabel');
const penSizeInput = document.getElementById('penSize');
const penSizeValue = document.getElementById('penSizeValue');
const fontSizeInput = document.getElementById('fontSize');
const fontSizeLabel = document.getElementById('fontSizeLabel');
const fontSelectGroup = document.getElementById('fontSelectGroup');
const fontFamilySelect = document.getElementById('fontFamilySelect');
const canvasBgColor = document.getElementById('canvasBgColor');

// エフェクトパネル DOM要素
const fxTabBtns = document.querySelectorAll('.fx-tab-btn');
const fxTabContents = document.querySelectorAll('.fx-tab-content');

// 塗り形式・グラデーション
const fillModeSolid = document.getElementById('fillModeSolid');
const fillModeGradient = document.getElementById('fillModeGradient');
const gradientControls = document.getElementById('gradientControls');
const gradColor1 = document.getElementById('gradColor1');
const gradColor2 = document.getElementById('gradColor2');
const gradDirection = document.getElementById('gradDirection');
const presetBtns = document.querySelectorAll('.btn-preset');

// 立体 影 (Shadow)
const shadowEnable = document.getElementById('shadowEnable');
const shadowBlur = document.getElementById('shadowBlur');
const shadowBlurVal = document.getElementById('shadowBlurVal');
const shadowOffset = document.getElementById('shadowOffset');
const shadowOffsetVal = document.getElementById('shadowOffsetVal');
const shadowAngle = document.getElementById('shadowAngle');
const shadowAngleVal = document.getElementById('shadowAngleVal');
const shadowColor = document.getElementById('shadowColor');
const shadowOpacity = document.getElementById('shadowOpacity');
const shadowOpacityVal = document.getElementById('shadowOpacityVal');

// 立体 艶 (Gloss)
const glossEnable = document.getElementById('glossEnable');
const glossType = document.getElementById('glossType');
const glossIntensity = document.getElementById('glossIntensity');
const glossIntensityVal = document.getElementById('glossIntensityVal');

// フィルター (透明度, ぼかし, 尖鋭化)
const layerOpacity = document.getElementById('layerOpacity');
const layerOpacityVal = document.getElementById('layerOpacityVal');
const layerBlur = document.getElementById('layerBlur');
const layerBlurVal = document.getElementById('layerBlurVal');
const layerSharpen = document.getElementById('layerSharpen');
const layerSharpenVal = document.getElementById('layerSharpenVal');

// エフェクトタブ切り替え制御
fxTabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    fxTabBtns.forEach(b => b.classList.remove('active'));
    fxTabContents.forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const targetId = btn.getAttribute('data-tab');
    const targetContent = document.getElementById(targetId);
    if (targetContent) targetContent.classList.add('active');
  });
});

// カラー・サイズ変更ハンドラ
penColorInput.addEventListener('input', () => {
  const hex = penColorInput.value.toUpperCase();
  penColorInput.title = `描画色 (${hex})`;
  if (colorHexLabel) colorHexLabel.textContent = hex;
  if (selectedObject) {
    selectedObject.color = penColorInput.value;
    redraw();
  }
});

penSizeInput.addEventListener('input', () => {
  penSizeValue.textContent = penSizeInput.value;
  if (selectedObject && ['pen', 'line', 'rect', 'circle'].includes(selectedObject.type)) {
    selectedObject.size = parseInt(penSizeInput.value) || 1;
    redraw();
  }
});

if (fontSizeInput) {
  fontSizeInput.addEventListener('input', () => {
    if (selectedObject && selectedObject.type === 'text') {
      selectedObject.size = parseInt(fontSizeInput.value) || 32;
      redraw();
    }
  });
}

if (fontFamilySelect) {
  fontFamilySelect.addEventListener('change', () => {
    if (selectedObject && selectedObject.type === 'text') {
      selectedObject.fontFamily = fontFamilySelect.value;
      redraw();
    }
  });
}

// 塗り形式（単色 / グラデーション）ラジオ切り替え
if (fillModeSolid && fillModeGradient && gradientControls) {
  const handleFillModeChange = () => {
    gradientControls.classList.toggle('hidden', fillModeSolid.checked);
    onEffectParamChange();
  };
  fillModeSolid.addEventListener('change', handleFillModeChange);
  fillModeGradient.addEventListener('change', handleFillModeChange);
}

// グラデーションプリセットボタン
presetBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (gradColor1 && btn.dataset.c1) gradColor1.value = btn.dataset.c1;
    if (gradColor2 && btn.dataset.c2) gradColor2.value = btn.dataset.c2;
    if (fillModeGradient) fillModeGradient.checked = true;
    if (gradientControls) gradientControls.classList.remove('hidden');
    onEffectParamChange();
    showToast(`🎨 グラデーションプリセット「${btn.title}」を適用しました`);
  });
});

// グラデーション入力変更
[gradColor1, gradColor2, gradDirection].forEach(el => {
  if (el) {
    el.addEventListener('input', onEffectParamChange);
    el.addEventListener('change', onEffectParamChange);
  }
});

// 影スライダー・値表示・変更
if (shadowBlur) {
  shadowBlur.addEventListener('input', () => {
    if (shadowBlurVal) shadowBlurVal.textContent = shadowBlur.value;
    onEffectParamChange();
  });
}
if (shadowOffset) {
  shadowOffset.addEventListener('input', () => {
    if (shadowOffsetVal) shadowOffsetVal.textContent = shadowOffset.value;
    onEffectParamChange();
  });
}
if (shadowAngle) {
  shadowAngle.addEventListener('input', () => {
    if (shadowAngleVal) shadowAngleVal.textContent = shadowAngle.value;
    onEffectParamChange();
  });
}
if (shadowOpacity) {
  shadowOpacity.addEventListener('input', () => {
    if (shadowOpacityVal) shadowOpacityVal.textContent = shadowOpacity.value;
    onEffectParamChange();
  });
}
if (shadowColor) {
  shadowColor.addEventListener('input', onEffectParamChange);
}
if (shadowEnable) {
  shadowEnable.addEventListener('change', onEffectParamChange);
}

// 艶スライダー・値表示・変更
if (glossIntensity) {
  glossIntensity.addEventListener('input', () => {
    if (glossIntensityVal) glossIntensityVal.textContent = glossIntensity.value;
    onEffectParamChange();
  });
}
if (glossType) {
  glossType.addEventListener('change', onEffectParamChange);
}
if (glossEnable) {
  glossEnable.addEventListener('change', onEffectParamChange);
}

// フィルター (透明度・ぼかし・尖鋭化) スライダーイベント
if (layerOpacity) {
  layerOpacity.addEventListener('input', () => {
    if (layerOpacityVal) layerOpacityVal.textContent = layerOpacity.value;
    onEffectParamChange();
  });
}
if (layerBlur) {
  layerBlur.addEventListener('input', () => {
    if (layerBlurVal) layerBlurVal.textContent = layerBlur.value;
    onEffectParamChange();
  });
}
if (layerSharpen) {
  layerSharpen.addEventListener('input', () => {
    if (layerSharpenVal) layerSharpenVal.textContent = layerSharpen.value;
    onEffectParamChange();
  });
}

// 現在のエフェクト設定オブジェクトを取得
function getCurrentEffectSettings() {
  const isGrad = fillModeGradient && fillModeGradient.checked;
  return {
    fillMode: isGrad ? 'gradient' : 'solid',
    gradColor1: gradColor1 ? gradColor1.value : '#4BEFFF',
    gradColor2: gradColor2 ? gradColor2.value : '#0066FF',
    gradDirection: gradDirection ? gradDirection.value : 'toBottom',
    // 影
    shadowEnable: shadowEnable ? shadowEnable.checked : false,
    shadowBlur: shadowBlur ? parseInt(shadowBlur.value) : 8,
    shadowOffset: shadowOffset ? parseInt(shadowOffset.value) : 6,
    shadowAngle: shadowAngle ? parseInt(shadowAngle.value) : 45,
    shadowColor: shadowColor ? shadowColor.value : '#000000',
    shadowOpacity: shadowOpacity ? parseInt(shadowOpacity.value) : 60,
    // 艶
    glossEnable: glossEnable ? glossEnable.checked : false,
    glossType: glossType ? glossType.value : 'top',
    glossIntensity: glossIntensity ? parseInt(glossIntensity.value) : 50,
    // フィルター (透明度, ぼかし, 尖鋭化)
    opacity: layerOpacity ? parseInt(layerOpacity.value) : 100,
    blur: layerBlur ? parseFloat(layerBlur.value) : 0,
    sharpen: layerSharpen ? parseInt(layerSharpen.value) : 0,
  };
}

// エフェクトパラメータ変更時に選択オブジェクトへ即座反映
function onEffectParamChange() {
  if (!selectedObject) return;
  const eff = getCurrentEffectSettings();
  Object.assign(selectedObject, eff);
  if (selectedObject.type === 'text' && fontFamilySelect) {
    selectedObject.fontFamily = fontFamilySelect.value;
  }
  redraw();
}

// 選択オブジェクトの設定をUIコントロール群に同期反映
function syncEffectControlsWithObject(o) {
  if (!o) return;

  // テキストプロパティ
  if (o.type === 'text') {
    if (fontSizeInput && o.size) fontSizeInput.value = o.size;
    if (fontFamilySelect && o.fontFamily) fontFamilySelect.value = o.fontFamily;
  }

  // カラー・グラデーション
  if (o.color && penColorInput) {
    penColorInput.value = o.color;
    penColorInput.title = `描画色 (${o.color.toUpperCase()})`;
    if (colorHexLabel) colorHexLabel.textContent = o.color.toUpperCase();
  }
  if (o.fillMode === 'gradient') {
    if (fillModeGradient) fillModeGradient.checked = true;
    if (gradientControls) gradientControls.classList.remove('hidden');
  } else {
    if (fillModeSolid) fillModeSolid.checked = true;
    if (gradientControls) gradientControls.classList.add('hidden');
  }
  if (o.gradColor1 && gradColor1) gradColor1.value = o.gradColor1;
  if (o.gradColor2 && gradColor2) gradColor2.value = o.gradColor2;
  if (o.gradDirection && gradDirection) gradDirection.value = o.gradDirection;

  // 影
  if (shadowEnable) shadowEnable.checked = !!o.shadowEnable;
  if (o.shadowBlur != null && shadowBlur) {
    shadowBlur.value = o.shadowBlur;
    if (shadowBlurVal) shadowBlurVal.textContent = o.shadowBlur;
  }
  if (o.shadowOffset != null && shadowOffset) {
    shadowOffset.value = o.shadowOffset;
    if (shadowOffsetVal) shadowOffsetVal.textContent = o.shadowOffset;
  }
  if (o.shadowAngle != null && shadowAngle) {
    shadowAngle.value = o.shadowAngle;
    if (shadowAngleVal) shadowAngleVal.textContent = o.shadowAngle;
  }
  if (o.shadowColor && shadowColor) shadowColor.value = o.shadowColor;
  if (o.shadowOpacity != null && shadowOpacity) {
    shadowOpacity.value = o.shadowOpacity;
    if (shadowOpacityVal) shadowOpacityVal.textContent = o.shadowOpacity;
  }

  // 艶
  if (glossEnable) glossEnable.checked = !!o.glossEnable;
  if (o.glossType && glossType) glossType.value = o.glossType;
  if (o.glossIntensity != null && glossIntensity) {
    glossIntensity.value = o.glossIntensity;
    if (glossIntensityVal) glossIntensityVal.textContent = o.glossIntensity;
  }

  // フィルター (透明度, ぼかし, 尖鋭化)
  if (layerOpacity) {
    const op = (o.opacity != null) ? o.opacity : 100;
    layerOpacity.value = op;
    if (layerOpacityVal) layerOpacityVal.textContent = op;
  }
  if (layerBlur) {
    const bl = (o.blur != null) ? o.blur : 0;
    layerBlur.value = bl;
    if (layerBlurVal) layerBlurVal.textContent = bl;
  }
  if (layerSharpen) {
    const sh = (o.sharpen != null) ? o.sharpen : 0;
    layerSharpen.value = sh;
    if (layerSharpenVal) layerSharpenVal.textContent = sh;
  }
}

const selectTransformBtn = document.getElementById('selectTransformBtn');
let isSelectModeActive = false;
let previousDrawingTool = 'pen';

if (selectTransformBtn) {
  selectTransformBtn.addEventListener('click', () => {
    isSelectModeActive = !isSelectModeActive;
    if (isSelectModeActive) {
      previousDrawingTool = toolSelect.value;
      selectTransformBtn.classList.add('active');
      canvas.style.cursor = 'default';
      showToast("✋ 選択・変形モード（レイヤーをつまんで移動・拡大縮小）");
    } else {
      selectTransformBtn.classList.remove('active');
      canvas.style.cursor = 'crosshair';
      selectedObject = null;
      redraw();
    }
  });
}

// ↷90度回転ボタン（選択中または最前面のオブジェクトを時計回りに90度回転）
const rotate90Btn = document.getElementById('rotate90Btn');
if (rotate90Btn) {
  rotate90Btn.addEventListener('click', () => {
    // 選択中オブジェクトがなければ最前面のオブジェクトを自動選択
    if (!selectedObject && objects.length > 0) {
      selectedObject = objects[objects.length - 1];
      isSelectModeActive = true;
      if (selectTransformBtn) selectTransformBtn.classList.add('active');
      syncEffectControlsWithObject(selectedObject);
    }

    if (!selectedObject) {
      showToast("⚠️ 回転するレイヤーがありません（キャンバスに描画してください）");
      return;
    }

    saveState();
    selectedObject.rotation = ((selectedObject.rotation || 0) + 90) % 360;
    redraw();
    const rotDeg = selectedObject.rotation;
    showToast(`↷ 90°回転しました（現在: ${rotDeg}°）`);
  });
}

toolSelect.addEventListener('change', () => {
  const isText = (toolSelect.value === 'text');
  fontSizeLabel.classList.toggle('hidden', !isText);
  if (fontSelectGroup) fontSelectGroup.classList.toggle('hidden', !isText);

  if (isSelectModeActive) {
    isSelectModeActive = false;
    if (selectTransformBtn) selectTransformBtn.classList.remove('active');
    selectedObject = null;
    redraw();
  }
});

// キャンバス背景色切替
canvasBgColor.addEventListener('change', () => {
  const bg = canvasBgColor.value;
  if (bg === 'transparent') {
    canvas.classList.add('checkerboard-bg');
    canvas.style.backgroundColor = '';
  } else {
    canvas.classList.remove('checkerboard-bg');
    canvas.style.backgroundColor = bg;
  }
});

// スマホ・PC共通の座標取得（スケーリング補正付き）
function getPos(e, targetCanvas) {
  const rect = targetCanvas.getBoundingClientRect();
  let clientX, clientY;

  if (e.touches && e.touches.length > 0) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else if (e.changedTouches && e.changedTouches.length > 0) {
    clientX = e.changedTouches[0].clientX;
    clientY = e.changedTouches[0].clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }

  const scaleX = targetCanvas.width / rect.width;
  const scaleY = targetCanvas.height / rect.height;

  return {
    x: Math.round((clientX - rect.left) * scaleX),
    y: Math.round((clientY - rect.top) * scaleY)
  };
}

// マウスイベント
// ==========================================
// レイヤー変形・ハンドル・ピンチ操作の状態管理
// ==========================================
let activeHandle = null;         // 'tl', 'tc', 'tr', 'ml', 'mr', 'bl', 'bc', 'br', 'rotate'
let isDraggingObject = false;    // 選択オブジェクト自体の移動中か
let isPinching = false;          // 2本指ピンチ操作中か
let initialPinchDist = 0;
let initialPinchMidX = 0;
let initialPinchMidY = 0;
let transformInitialBounds = null;
let transformSnapshot = null;

// 四隅の「↺」回転ドラッグ操作用ステート
let rotateCenter = null;         // 回転の中心座標 { x, y }
let rotateStartAngle = 0;        // ドラッグ開始時のマウス絶対角度 (rad)
let rotateInitialAngle = 0;      // ドラッグ開始時のオブジェクト角度 (deg)

// 座標逆回転変換（キャンバス絶対座標 -> オブジェクト中心を軸としたローカル座標）
function toLocalPoint(pt, cx, cy, rotDeg) {
  if (!rotDeg) return { x: pt.x, y: pt.y };
  const rad = (-rotDeg * Math.PI) / 180;
  const dx = pt.x - cx;
  const dy = pt.y - cy;
  return {
    x: cx + dx * Math.cos(rad) - dy * Math.sin(rad),
    y: cy + dx * Math.sin(rad) + dy * Math.cos(rad)
  };
}

// 座標順回転変換（ローカル座標 -> キャンバス絶対座標）
function toGlobalPoint(pt, cx, cy, rotDeg) {
  if (!rotDeg) return { x: pt.x, y: pt.y };
  const rad = (rotDeg * Math.PI) / 180;
  const dx = pt.x - cx;
  const dy = pt.y - cy;
  return {
    x: cx + dx * Math.cos(rad) - dy * Math.sin(rad),
    y: cy + dx * Math.sin(rad) + dy * Math.cos(rad)
  };
}

function cloneObject(obj) {
  if (!obj) return null;
  const copy = JSON.parse(JSON.stringify(obj, (k, v) => (k === 'imgElement' ? undefined : v)));
  if (obj.imgElement) copy.imgElement = obj.imgElement;
  return copy;
}

// 境界ボックスの取得
function getObjectBounds(o) {
  if (!o) return null;
  if (o.type === 'rect' || o.type === 'rectFill' || o.type === 'image') {
    return {
      x: o.x,
      y: o.y,
      w: Math.max(4, o.w),
      h: Math.max(4, o.h)
    };
  }
  if (o.type === 'circle' || o.type === 'circleFill') {
    return {
      x: o.x - o.r,
      y: o.y - o.r,
      w: Math.max(4, o.r * 2),
      h: Math.max(4, o.r * 2)
    };
  }
  if (o.type === 'line') {
    const minX = Math.min(o.x1, o.x2);
    const minY = Math.min(o.y1, o.y2);
    const maxX = Math.max(o.x1, o.x2);
    const maxY = Math.max(o.y1, o.y2);
    return {
      x: minX,
      y: minY,
      w: Math.max(6, maxX - minX),
      h: Math.max(6, maxY - minY)
    };
  }
  if (o.type === 'text') {
    ctx.save();
    ctx.font = `bold ${o.size}px ${o.fontFamily || "'Outfit', 'Noto Sans JP', sans-serif"}`;
    const metrics = ctx.measureText(o.text);
    const textWidth = Math.max(10, Math.round(metrics.width));
    ctx.restore();
    return {
      x: o.x,
      y: o.y,
      w: textWidth,
      h: Math.max(10, o.size)
    };
  }
  if ((o.type === 'pen' || o.type === 'eraser') && o.points && o.points.length > 0) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const p of o.points) {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    }
    const pad = Math.ceil((o.size || 2) / 2);
    return {
      x: minX - pad,
      y: minY - pad,
      w: Math.max(8, maxX - minX + pad * 2),
      h: Math.max(8, maxY - minY + pad * 2)
    };
  }
  return null;
}

// 8つのハンドル位置（4つの角 + 4つの辺の中心）
function getHandlePositions(b) {
  if (!b) return {};
  return {
    tl: { x: b.x, y: b.y },
    tc: { x: b.x + b.w / 2, y: b.y },
    tr: { x: b.x + b.w, y: b.y },
    ml: { x: b.x, y: b.y + b.h / 2 },
    mr: { x: b.x + b.w, y: b.y + b.h / 2 },
    bl: { x: b.x, y: b.y + b.h },
    bc: { x: b.x + b.w / 2, y: b.y + b.h },
    br: { x: b.x + b.w, y: b.y + b.h }
  };
}

// 四隅の「↺」回転ハンドル位置（四隅の角から斜め外側に16pxオフセット）
function getRotateHandlePositions(b) {
  if (!b) return {};
  const offset = 16;
  return {
    rot_tl: { x: b.x - offset, y: b.y - offset },
    rot_tr: { x: b.x + b.w + offset, y: b.y - offset },
    rot_bl: { x: b.x - offset, y: b.y + b.h + offset },
    rot_br: { x: b.x + b.w + offset, y: b.y + b.h + offset }
  };
}

// 四隅回転ハンドルの当たり判定
function findRotateHandleAt(localPos, b, hitRadius = 14) {
  if (!b) return null;
  const rotHandles = getRotateHandlePositions(b);
  for (const [key, pt] of Object.entries(rotHandles)) {
    if (Math.hypot(localPos.x - pt.x, localPos.y - pt.y) <= hitRadius) {
      return key;
    }
  }
  return null;
}

// ハンドル判定（スマホは当たり判定を広めに確保）
function findHandleAt(pos, bounds, hitRadius = 12) {
  if (!bounds) return null;
  const handles = getHandlePositions(bounds);
  for (const [key, pt] of Object.entries(handles)) {
    if (Math.hypot(pos.x - pt.x, pos.y - pt.y) <= hitRadius) {
      return key;
    }
  }
  return null;
}

function isPointInBounds(pt, b) {
  if (!b) return false;
  return pt.x >= b.x && pt.x <= b.x + b.w && pt.y >= b.y && pt.y <= b.y + b.h;
}

// ハンドルドラッグによる新境界計算
function calculateNewBounds(initialB, handle, dx, dy) {
  let { x, y, w, h } = initialB;
  const minSize = 8;

  switch (handle) {
    case 'tl':
      x += dx; y += dy; w -= dx; h -= dy;
      break;
    case 'tc':
      y += dy; h -= dy;
      break;
    case 'tr':
      y += dy; w += dx; h -= dy;
      break;
    case 'ml':
      x += dx; w -= dx;
      break;
    case 'mr':
      w += dx;
      break;
    case 'bl':
      x += dx; w -= dx; h += dy;
      break;
    case 'bc':
      h += dy;
      break;
    case 'br':
      w += dx; h += dy;
      break;
  }

  if (w < minSize) {
    if (handle === 'tl' || handle === 'ml' || handle === 'bl') {
      x = initialB.x + initialB.w - minSize;
    }
    w = minSize;
  }
  if (h < minSize) {
    if (handle === 'tl' || handle === 'tc' || handle === 'tr') {
      y = initialB.y + initialB.h - minSize;
    }
    h = minSize;
  }

  return { x, y, w, h };
}

// 新境界をオブジェクトに適用
function applyBoundsToObject(target, oldB, newB) {
  if (!target || !oldB || !newB) return;
  const scaleX = oldB.w === 0 ? 1 : newB.w / oldB.w;
  const scaleY = oldB.h === 0 ? 1 : newB.h / oldB.h;

  if (target.type === 'rect' || target.type === 'rectFill' || target.type === 'image') {
    target.x = Math.round(newB.x);
    target.y = Math.round(newB.y);
    target.w = Math.round(newB.w);
    target.h = Math.round(newB.h);
  } else if (target.type === 'circle' || target.type === 'circleFill') {
    const newR = Math.max(2, Math.round(Math.min(newB.w, newB.h) / 2));
    target.x = Math.round(newB.x + newB.w / 2);
    target.y = Math.round(newB.y + newB.h / 2);
    target.r = newR;
  } else if (target.type === 'line') {
    target.x1 = Math.round(newB.x + (target.x1 - oldB.x) * scaleX);
    target.y1 = Math.round(newB.y + (target.y1 - oldB.y) * scaleY);
    target.x2 = Math.round(newB.x + (target.x2 - oldB.x) * scaleX);
    target.y2 = Math.round(newB.y + (target.y2 - oldB.y) * scaleY);
  } else if (target.type === 'text') {
    target.x = Math.round(newB.x);
    target.y = Math.round(newB.y);
    target.size = Math.max(8, Math.round(target.size * scaleY));
  } else if ((target.type === 'pen' || target.type === 'eraser') && target.points) {
    for (const p of target.points) {
      p.x = Math.round(newB.x + (p.x - oldB.x) * scaleX);
      p.y = Math.round(newB.y + (p.y - oldB.y) * scaleY);
    }
  }
}

// 選択枠 & 8つのリサイズハンドル & 四隅の「↺」回転ハンドル描画
function drawSelectionBox(ctx, obj) {
  const b = getObjectBounds(obj);
  if (!b) return;

  const cx = b.x + b.w / 2;
  const cy = b.y + b.h / 2;
  const rot = obj.rotation || 0;

  ctx.save();
  // オブジェクトの回転に合わせて選択枠全体を中心基準で回転
  if (rot) {
    ctx.translate(cx, cy);
    ctx.rotate((rot * Math.PI) / 180);
    ctx.translate(-cx, -cy);
  }

  // 1. 外枠（ネオンピンク破線）
  ctx.strokeStyle = '#FF4BD8';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 4]);
  ctx.strokeRect(b.x - 0.5, b.y - 0.5, b.w + 1, b.h + 1);

  // 2. 8つのつまみハンドル（4角 ＋ 4辺の中央）
  ctx.setLineDash([]);
  const handles = getHandlePositions(b);
  for (const [key, pt] of Object.entries(handles)) {
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#FF4BD8';
    ctx.stroke();
  }

  // 3. 四隅の「↺」回転ハンドル（各角から外側に16pxオフセット）
  const rotHandles = getRotateHandlePositions(b);
  const cornerMap = {
    rot_tl: { x: b.x, y: b.y },
    rot_tr: { x: b.x + b.w, y: b.y },
    rot_bl: { x: b.x, y: b.y + b.h },
    rot_br: { x: b.x + b.w, y: b.y + b.h }
  };

  for (const [key, pt] of Object.entries(rotHandles)) {
    const corner = cornerMap[key];

    // 角から回転ハンドルへの細い接続ライン
    ctx.strokeStyle = 'rgba(75, 239, 255, 0.45)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(corner.x, corner.y);
    ctx.lineTo(pt.x, pt.y);
    ctx.stroke();

    // 回転ハンドルの円（サイバーシアン枠＋ダーク背景）
    ctx.save();
    ctx.shadowColor = 'rgba(75, 239, 255, 0.7)';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 8.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(10, 15, 31, 0.95)';
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#4BEFFF';
    ctx.stroke();
    ctx.restore();

    // 円の中心に「↺」マーク
    ctx.save();
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#4BEFFF';
    ctx.fillText('↺', pt.x, pt.y + 0.5);
    ctx.restore();
  }

  // 4. 描写の正確なpixelサイズ & 回転角度バッジ描画
  const w = Math.round(b.w);
  const h = Math.round(b.h);
  let sizeText = `${w} × ${h} px`;
  if (obj.type === 'circle' || obj.type === 'circleFill') {
    sizeText = `R:${obj.r}px (${w}×${h})`;
  }
  if (rot) {
    sizeText += ` (${rot}°)`;
  }

  ctx.font = 'bold 11px monospace';
  const textMetrics = ctx.measureText(sizeText);
  const badgeW = Math.round(textMetrics.width) + 14;
  const badgeH = 18;
  const badgeX = Math.round(b.x + (b.w - badgeW) / 2);
  const badgeY = b.y > 28 ? Math.round(b.y - badgeH - 8) : Math.round(b.y + b.h + 8);

  // 背景バッジ（ダーク半透明＋ピンクボーダー）
  ctx.fillStyle = 'rgba(10, 15, 31, 0.9)';
  ctx.strokeStyle = '#FF4BD8';
  ctx.lineWidth = 1;
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 4);
  } else {
    ctx.rect(badgeX, badgeY, badgeW, badgeH);
  }
  ctx.fill();
  ctx.stroke();

  // サイズテキスト（白＋ピンクシャドウ）
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(255, 75, 216, 0.6)';
  ctx.shadowBlur = 4;
  ctx.fillText(sizeText, badgeX + 7, badgeY + badgeH / 2);

  ctx.restore();
}

// リアルタイム・ガイド線 / 描画予定枠用
let currentDragPos = null;

function drawGuidePreview(ctx, tool, sx, sy, cur) {
  if (!cur) return;
  const color = penColorInput.value;
  const size = parseInt(penSizeInput.value) || 1;
  const curEff = getCurrentEffectSettings();

  ctx.save();

  if (tool === 'line') {
    applyShadowToCtx(ctx, curEff);
    const bounds = {
      x: Math.min(sx, cur.x),
      y: Math.min(sy, cur.y),
      w: Math.max(2, Math.abs(cur.x - sx)),
      h: Math.max(2, Math.abs(cur.y - sy))
    };
    const fillOrStroke = getCanvasFillOrStroke(ctx, { ...curEff, color }, bounds, color);

    // 描画予定の直線
    ctx.strokeStyle = fillOrStroke;
    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(cur.x, cur.y);
    ctx.stroke();

    // 端点ガイドサークル & 破線
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = '#FF4BD8';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.arc(cur.x, cur.y, 4, 0, Math.PI * 2);
    ctx.stroke();

    const len = Math.round(Math.hypot(cur.x - sx, cur.y - sy));
    ctx.fillStyle = '#FF4BD8';
    ctx.font = '10px monospace';
    ctx.fillText(`L:${len}px`, cur.x + 8, cur.y - 6);
  }

  if (tool === 'rect') {
    const rx = Math.min(sx, cur.x);
    const ry = Math.min(sy, cur.y);
    const rw = Math.abs(cur.x - sx);
    const rh = Math.abs(cur.y - sy);
    const bounds = { x: rx, y: ry, w: rw, h: rh };

    applyShadowToCtx(ctx, curEff);
    const fillOrStroke = getCanvasFillOrStroke(ctx, { ...curEff, color }, bounds, color);

    // 予定の枠線
    ctx.strokeStyle = fillOrStroke;
    ctx.lineWidth = size;
    ctx.strokeRect(rx, ry, rw, rh);

    // ガイド枠（外側のピンク破線枠）
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = '#FF4BD8';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.strokeRect(rx - 1, ry - 1, rw + 2, rh + 2);

    // サイズ表示
    ctx.fillStyle = '#FF4BD8';
    ctx.font = '10px monospace';
    ctx.fillText(`${rw}×${rh}`, rx, ry > 14 ? ry - 5 : ry + rh + 12);
  }

  if (tool === 'rectFill') {
    const rx = Math.min(sx, cur.x);
    const ry = Math.min(sy, cur.y);
    const rw = Math.abs(cur.x - sx);
    const rh = Math.abs(cur.y - sy);
    const bounds = { x: rx, y: ry, w: rw, h: rh };

    applyShadowToCtx(ctx, curEff);
    const fillOrStroke = getCanvasFillOrStroke(ctx, { ...curEff, color }, bounds, color);

    // 予定の塗り（半透明プレビュー）
    ctx.fillStyle = fillOrStroke;
    ctx.globalAlpha = 0.6;
    ctx.fillRect(rx, ry, rw, rh);

    // ガイド枠（ピンク破線）
    ctx.globalAlpha = 1.0;
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = '#FF4BD8';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.strokeRect(rx, ry, rw, rh);

    // サイズ表示
    ctx.fillStyle = '#FF4BD8';
    ctx.font = '10px monospace';
    ctx.fillText(`${rw}×${rh}`, rx, ry > 14 ? ry - 5 : ry + rh + 12);
  }

  if (tool === 'circle') {
    const radius = Math.round(Math.hypot(cur.x - sx, cur.y - sy));
    const bounds = { x: sx - radius, y: sy - radius, w: radius * 2, h: radius * 2 };

    applyShadowToCtx(ctx, curEff);
    const fillOrStroke = getCanvasFillOrStroke(ctx, { ...curEff, color }, bounds, color);

    // 予定の円枠
    ctx.strokeStyle = fillOrStroke;
    ctx.lineWidth = size;
    ctx.beginPath();
    ctx.arc(sx, sy, radius, 0, Math.PI * 2);
    ctx.stroke();

    // 半径ガイド線（中心からマウス位置へのピンク破線）
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = '#FF4BD8';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(cur.x, cur.y);
    ctx.stroke();

    // 半径表示
    ctx.fillStyle = '#FF4BD8';
    ctx.font = '10px monospace';
    ctx.fillText(`R:${radius}px`, cur.x + 8, cur.y);
  }

  if (tool === 'circleFill') {
    const radius = Math.round(Math.hypot(cur.x - sx, cur.y - sy));
    const bounds = { x: sx - radius, y: sy - radius, w: radius * 2, h: radius * 2 };

    applyShadowToCtx(ctx, curEff);
    const fillOrStroke = getCanvasFillOrStroke(ctx, { ...curEff, color }, bounds, color);

    // 予定の塗り（半透明プレビュー）
    ctx.fillStyle = fillOrStroke;
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.arc(sx, sy, radius, 0, Math.PI * 2);
    ctx.fill();

    // 外枠ガイド
    ctx.globalAlpha = 1.0;
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = '#FF4BD8';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.arc(sx, sy, radius, 0, Math.PI * 2);
    ctx.stroke();

    // 半径ガイド線
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(cur.x, cur.y);
    ctx.stroke();

    // 半径表示
    ctx.fillStyle = '#FF4BD8';
    ctx.font = '10px monospace';
    ctx.fillText(`R:${radius}px`, cur.x + 8, cur.y);
  }

  ctx.restore();
}

// スポイトボタン制御
const eyedropperBtn = document.getElementById('eyedropperBtn');
let isEyedropperActive = false;

if (eyedropperBtn) {
  eyedropperBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (window.EyeDropper) {
      const eyeDropper = new window.EyeDropper();
      eyeDropper.open().then(result => {
        const hex = result.sRGBHex.toUpperCase();
        penColorInput.value = result.sRGBHex;
        penColorInput.title = `描画色 (${hex})`;
        if (colorHexLabel) colorHexLabel.textContent = hex;
        showToast(`🎨 色を取得しました: ${hex}`);
      }).catch(() => {
        toggleCanvasEyedropper();
      });
      return;
    }
    toggleCanvasEyedropper();
  });
}

function toggleCanvasEyedropper() {
  isEyedropperActive = !isEyedropperActive;
  if (isEyedropperActive) {
    if (eyedropperBtn) eyedropperBtn.classList.add('active');
    canvas.style.cursor = 'crosshair';
    showToast("🎨 スポイト: キャンバス上の色をクリックして取得してください");
  } else {
    if (eyedropperBtn) eyedropperBtn.classList.remove('active');
    canvas.style.cursor = toolSelect.value === 'select' ? 'default' : 'crosshair';
  }
}

// マウスイベント
canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', endDraw);
canvas.addEventListener('mouseleave', endDraw);

// スマホ用タッチイベント（2本指ピンチ操作 & スクロール防止）
canvas.addEventListener('touchstart', (e) => {
  e.preventDefault();
  startDraw(e);
}, { passive: false });

canvas.addEventListener('touchmove', (e) => {
  e.preventDefault();
  draw(e);
}, { passive: false });

canvas.addEventListener('touchend', (e) => {
  e.preventDefault();
  endDraw(e);
});

// PCでのマウスカーソル形状の動的変更
canvas.addEventListener('mousemove', (e) => {
  if (drawing || activeHandle || isDraggingObject) return;
  if (isEyedropperActive) {
    canvas.style.cursor = 'crosshair';
    return;
  }
  if (selectedObject) {
    const pos = getPos(e, canvas);
    const bounds = getObjectBounds(selectedObject);
    if (bounds) {
      const cx = bounds.x + bounds.w / 2;
      const cy = bounds.y + bounds.h / 2;
      const rot = selectedObject.rotation || 0;
      const localPos = toLocalPoint(pos, cx, cy, rot);

      // 四隅の「↺」回転ハンドル
      const rotHandle = findRotateHandleAt(localPos, bounds, 12);
      if (rotHandle) {
        canvas.style.cursor = 'grab';
        return;
      }

      // 8つのリサイズハンドル
      const handle = findHandleAt(localPos, bounds, 10);
      if (handle) {
        const cursors = {
          tl: 'nwse-resize', tr: 'nesw-resize', br: 'nwse-resize', bl: 'nesw-resize',
          tc: 'ns-resize', bc: 'ns-resize', ml: 'ew-resize', mr: 'ew-resize'
        };
        canvas.style.cursor = cursors[handle] || 'pointer';
        return;
      } else if (isPointInBounds(localPos, bounds)) {
        canvas.style.cursor = 'move';
        return;
      }
    }
  }
  canvas.style.cursor = isSelectModeActive ? 'default' : 'crosshair';
});

function startDraw(e) {
  const pos = getPos(e, canvas);

  // スポイトモード時の色取得クリック
  if (isEyedropperActive) {
    pickColorAt(pos.x, pos.y);
    isEyedropperActive = false;
    if (eyedropperBtn) eyedropperBtn.classList.remove('active');
    canvas.style.cursor = isSelectModeActive ? 'default' : 'crosshair';
    drawing = false;
    return;
  }

  // 1. スマホの2本指スワイプ/ピンチによる拡大縮小
  if (e.touches && e.touches.length === 2) {
    const p1 = getPos({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY }, canvas);
    const p2 = getPos({ clientX: e.touches[1].clientX, clientY: e.touches[1].clientY }, canvas);
    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2;

    if (!selectedObject) {
      selectedObject = findObjectAt(midX, midY);
    }

    if (selectedObject) {
      isPinching = true;
      drawing = false;
      activeHandle = null;
      isDraggingObject = false;
      initialPinchDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      initialPinchMidX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      initialPinchMidY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      transformInitialBounds = getObjectBounds(selectedObject);
      transformSnapshot = cloneObject(selectedObject);
      isSelectModeActive = true;
      if (selectTransformBtn) selectTransformBtn.classList.add('active');
      syncEffectControlsWithObject(selectedObject);
      redraw();
      return;
    }
  }

  startX = pos.x;
  startY = pos.y;
  drawing = true;

  const tool = toolSelect.value;
  const isTouch = !!(e.touches && e.touches.length > 0);

  // ガイドプレビュー用の位置初期化（選択変形モードやオブジェクト選択中は行わない）
  if (!isSelectModeActive && !selectedObject && ['line', 'rect', 'rectFill', 'circle', 'circleFill'].includes(tool)) {
    currentDragPos = { x: pos.x, y: pos.y };
  } else {
    currentDragPos = null;
  }

  // 2. 選択中オブジェクトのハンドルやつまみ操作
  if (selectedObject) {
    const bounds = getObjectBounds(selectedObject);
    if (bounds) {
      const cx = bounds.x + bounds.w / 2;
      const cy = bounds.y + bounds.h / 2;
      const rot = selectedObject.rotation || 0;
      const localPos = toLocalPoint(pos, cx, cy, rot);

      // A. 四隅の「↺」回転ハンドルがタップされたか
      const rotHit = findRotateHandleAt(localPos, bounds, isTouch ? 22 : 14);
      if (rotHit) {
        activeHandle = 'rotate';
        rotateCenter = { x: cx, y: cy };
        rotateStartAngle = Math.atan2(pos.y - cy, pos.x - cx);
        rotateInitialAngle = rot;
        transformSnapshot = cloneObject(selectedObject);
        currentDragPos = null;
        drawing = true;
        return;
      }

      // B. 8つのリサイズハンドルがタップされたか
      const hitHandle = findHandleAt(localPos, bounds, isTouch ? 18 : 10);
      if (hitHandle) {
        activeHandle = hitHandle;
        transformInitialBounds = bounds;
        transformSnapshot = cloneObject(selectedObject);
        currentDragPos = null;
        drawing = true;
        return;
      }
    }
  }

  // 3. 選択・変形・移動モード（またはボタンON時）
  if (isSelectModeActive || tool === 'select') {
    if (selectedObject) {
      const b = getObjectBounds(selectedObject);
      if (b) {
        const cx = b.x + b.w / 2;
        const cy = b.y + b.h / 2;
        const localPos = toLocalPoint(pos, cx, cy, selectedObject.rotation || 0);
        if (isPointInBounds(localPos, b)) {
          isDraggingObject = true;
          return;
        }
      }
    }

    const hitObj = findObjectAt(pos.x, pos.y);
    if (hitObj) {
      selectedObject = hitObj;
      syncEffectControlsWithObject(selectedObject);
      isDraggingObject = true;
      isSelectModeActive = true;
      if (selectTransformBtn) selectTransformBtn.classList.add('active');
      redraw();
      return;
    } else {
      selectedObject = null;
      drawing = false;
      redraw();
      return;
    }
  }

  // 他の描画ツール使用時に既存の選択を解除
  if (selectedObject) {
    selectedObject = null;
    redraw();
  }

  // 塗りつぶしツール
  if (tool === 'fill') {
    floodFillAt(pos.x, pos.y);
    drawing = false;
    return;
  }

  // テキストツール
  if (tool === 'text') {
    drawing = false;
    setTimeout(() => {
      const text = prompt("キャンバスに追加するテキストを入力してください：", "IMP");
      if (text) {
        saveState();
        const eff = getCurrentEffectSettings();
        objects.push({
          type: "text",
          x: startX,
          y: startY,
          text: text,
          color: penColorInput.value,
          size: parseInt(fontSizeInput.value) || 32,
          fontFamily: fontFamilySelect ? fontFamilySelect.value : "'Outfit', 'Noto Sans JP', sans-serif",
          ...eff
        });
        redraw();
      }
    }, 10);
    return;
  }

  // ペンツール
  if (tool === 'pen') {
    saveState();
    const eff = getCurrentEffectSettings();
    objects.push({
      type: "pen",
      color: penColorInput.value,
      size: parseInt(penSizeInput.value) || 4,
      points: [{ x: startX, y: startY }],
      ...eff
    });
  }

  // 消しゴムツール
  if (tool === 'eraser') {
    saveState();
    const eff = getCurrentEffectSettings();
    objects.push({
      type: "eraser",
      size: parseInt(penSizeInput.value) || 8,
      points: [{ x: startX, y: startY }],
      ...eff
    });
  }
}

function draw(e) {
  // 1. 2本指ピンチ操作
  if (isPinching && e.touches && e.touches.length === 2 && selectedObject && transformInitialBounds) {
    const currentDist = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
    const scale = initialPinchDist > 0 ? currentDist / initialPinchDist : 1;

    const currentMidClientX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
    const currentMidClientY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const dx = (currentMidClientX - initialPinchMidX) * scaleX;
    const dy = (currentMidClientY - initialPinchMidY) * scaleY;

    const newW = Math.max(8, transformInitialBounds.w * scale);
    const newH = Math.max(8, transformInitialBounds.h * scale);
    const cx = transformInitialBounds.x + transformInitialBounds.w / 2 + dx;
    const cy = transformInitialBounds.y + transformInitialBounds.h / 2 + dy;

    const newBounds = {
      x: cx - newW / 2,
      y: cy - newH / 2,
      w: newW,
      h: newH
    };

    Object.assign(selectedObject, cloneObject(transformSnapshot));
    applyBoundsToObject(selectedObject, transformInitialBounds, newBounds);
    redraw();
    return;
  }

  if (!drawing) return;
  const pos = getPos(e, canvas);

  // 2. 四隅「↺」回転ハンドルのドラッグ回転操作
  if (activeHandle === 'rotate' && selectedObject && rotateCenter) {
    const currentAngle = Math.atan2(pos.y - rotateCenter.y, pos.x - rotateCenter.x);
    const deltaDeg = ((currentAngle - rotateStartAngle) * 180) / Math.PI;
    let newDeg = Math.round(rotateInitialAngle + deltaDeg);

    // Shiftキー押下時は15度刻みスナップ
    if (e.shiftKey) {
      newDeg = Math.round(newDeg / 15) * 15;
    }

    newDeg = ((newDeg % 360) + 360) % 360;
    selectedObject.rotation = newDeg;
    redraw();
    return;
  }

  // 3. 8つのハンドルをつまんで変形（回転角を考慮して変位を逆回転変換）
  if (activeHandle && activeHandle !== 'rotate' && selectedObject && transformInitialBounds) {
    let dx = pos.x - startX;
    let dy = pos.y - startY;

    if (selectedObject.rotation) {
      const rad = (-selectedObject.rotation * Math.PI) / 180;
      const rx = dx * Math.cos(rad) - dy * Math.sin(rad);
      const ry = dx * Math.sin(rad) + dy * Math.cos(rad);
      dx = rx;
      dy = ry;
    }

    const newBounds = calculateNewBounds(transformInitialBounds, activeHandle, dx, dy);

    Object.assign(selectedObject, cloneObject(transformSnapshot));
    applyBoundsToObject(selectedObject, transformInitialBounds, newBounds);
    redraw();
    return;
  }

  // 4. オブジェクト移動
  if (isDraggingObject && selectedObject) {
    const dx = pos.x - startX;
    const dy = pos.y - startY;
    moveObject(selectedObject, dx, dy);
    startX = pos.x;
    startY = pos.y;
    redraw();
    return;
  }

  // 5. ペン・消しゴム
  const tool = toolSelect.value;
  if (tool === 'pen' || tool === 'eraser') {
    const currentObj = objects[objects.length - 1];
    if (currentObj && (currentObj.type === 'pen' || currentObj.type === 'eraser')) {
      currentObj.points.push({ x: pos.x, y: pos.y });
      redraw();
    }
  }

  // 6. 直線・四角・円のリアルタイム・ガイド予定枠プレビュー（変形中・移動中・オブジェクト選択中は非表示）
  if (!activeHandle && !isDraggingObject && !selectedObject && ['line', 'rect', 'rectFill', 'circle', 'circleFill'].includes(tool)) {
    currentDragPos = pos;
    redraw();
  }
}

function endDraw(e) {
  if (isPinching) {
    isPinching = false;
    transformInitialBounds = null;
    transformSnapshot = null;
    saveState();
    redraw();
    return;
  }

  if (activeHandle === 'rotate') {
    activeHandle = null;
    rotateCenter = null;
    transformSnapshot = null;
    currentDragPos = null;
    drawing = false;
    saveState();
    redraw();
    return;
  }

  if (activeHandle) {
    activeHandle = null;
    transformInitialBounds = null;
    transformSnapshot = null;
    currentDragPos = null;
    drawing = false;
    saveState();
    redraw();
    return;
  }

  if (isDraggingObject) {
    isDraggingObject = false;
    currentDragPos = null;
    drawing = false;
    saveState();
    redraw();
    return;
  }

  if (!drawing) return;
  drawing = false;

  const pos = getPos(e, canvas);
  const tool = toolSelect.value;
  currentDragPos = null;

  if (tool === 'line') {
    if (Math.hypot(pos.x - startX, pos.y - startY) >= 2) {
      saveState();
      const eff = getCurrentEffectSettings();
      objects.push({
        type: "line",
        x1: startX,
        y1: startY,
        x2: pos.x,
        y2: pos.y,
        color: penColorInput.value,
        size: parseInt(penSizeInput.value) || 4,
        ...eff
      });
      redraw();
    }
  }

  if (tool === 'rect' || tool === 'rectFill') {
    const rw = Math.abs(pos.x - startX);
    const rh = Math.abs(pos.y - startY);
    if (rw >= 2 || rh >= 2) {
      saveState();
      const eff = getCurrentEffectSettings();
      objects.push({
        type: tool,
        x: Math.min(startX, pos.x),
        y: Math.min(startY, pos.y),
        w: rw,
        h: rh,
        color: penColorInput.value,
        size: parseInt(penSizeInput.value) || 4,
        ...eff
      });
      redraw();
    }
  }

  if (tool === 'circle' || tool === 'circleFill') {
    const radius = Math.round(Math.hypot(pos.x - startX, pos.y - startY));
    if (radius >= 2) {
      saveState();
      const eff = getCurrentEffectSettings();
      objects.push({
        type: tool,
        x: startX,
        y: startY,
        r: radius,
        color: penColorInput.value,
        size: parseInt(penSizeInput.value) || 4,
        ...eff
      });
      redraw();
    }
  }
}

// オブジェクト移動
function moveObject(o, dx, dy) {
  if (['text', 'rect', 'rectFill', 'circle', 'circleFill', 'image'].includes(o.type)) {
    o.x += dx;
    o.y += dy;
  }
  if (o.type === 'line') {
    o.x1 += dx; o.y1 += dy;
    o.x2 += dx; o.y2 += dy;
  }
  if (o.type === 'pen' || o.type === 'eraser') {
    o.points.forEach(p => {
      p.x += dx;
      p.y += dy;
    });
  }
}

// オブジェクト判定（回転角度を考慮）
function findObjectAt(x, y) {
  for (let i = objects.length - 1; i >= 0; i--) {
    const o = objects[i];
    const b = getObjectBounds(o);
    if (!b) continue;
    const cx = b.x + b.w / 2;
    const cy = b.y + b.h / 2;
    const localPos = toLocalPoint({ x, y }, cx, cy, o.rotation || 0);
    if (isPointInBounds(localPos, b)) {
      return o;
    }
  }
  return null;
}

// スポイト
function pickColorAt(x, y) {
  const pixel = ctx.getImageData(x, y, 1, 1).data;
  if (pixel[3] === 0) {
    showToast("⚠️ 透明ピクセルです");
    return;
  }
  const r = pixel[0].toString(16).padStart(2, '0');
  const g = pixel[1].toString(16).padStart(2, '0');
  const b = pixel[2].toString(16).padStart(2, '0');
  const hex = `#${r}${g}${b}`.toUpperCase();
  penColorInput.value = hex;
  penColorInput.title = `描画色 (${hex})`;
  if (colorHexLabel) colorHexLabel.textContent = hex;
  showToast(`🎨 色を取得しました: ${hex}`);
}

// 塗りつぶし（バケツ）
function floodFillAt(startX, startY) {
  saveState();
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;
  const targetIdx = (startY * canvas.width + startX) * 4;
  const targetR = data[targetIdx];
  const targetG = data[targetIdx + 1];
  const targetB = data[targetIdx + 2];
  const targetA = data[targetIdx + 3];

  const fillRgb = hexToRgb(penColorInput.value);
  if (targetR === fillRgb.r && targetG === fillRgb.g && targetB === fillRgb.b && targetA === 255) {
    return;
  }

  const w = canvas.width;
  const h = canvas.height;
  const queue = [[startX, startY]];
  const visited = new Uint8Array(w * h);

  function match(idx) {
    return Math.abs(data[idx] - targetR) < 15 &&
           Math.abs(data[idx + 1] - targetG) < 15 &&
           Math.abs(data[idx + 2] - targetB) < 15 &&
           Math.abs(data[idx + 3] - targetA) < 15;
  }

  while (queue.length > 0) {
    const [x, y] = queue.pop();
    const pixelIndex = y * w + x;
    if (visited[pixelIndex]) continue;
    visited[pixelIndex] = 1;

    const idx = pixelIndex * 4;
    if (!match(idx)) continue;

    data[idx] = fillRgb.r;
    data[idx + 1] = fillRgb.g;
    data[idx + 2] = fillRgb.b;
    data[idx + 3] = 255;

    if (x > 0) queue.push([x - 1, y]);
    if (x < w - 1) queue.push([x + 1, y]);
    if (y > 0) queue.push([x, y - 1]);
    if (y < h - 1) queue.push([x, y + 1]);
  }

  // 塗りつぶし結果を画像レイヤーとして保存
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = w;
  tempCanvas.height = h;
  tempCanvas.getContext('2d').putImageData(imgData, 0, 0);

  const img = new Image();
  img.src = tempCanvas.toDataURL();
  img.onload = () => {
    objects.push({
      type: "image",
      imgElement: img,
      dataUrl: img.src,
      x: 0,
      y: 0,
      w: w,
      h: h
    });
    redraw();
  };
}

function hexToRgb(hex) {
  if (!hex || !hex.startsWith('#')) return { r: 0, g: 0, b: 0 };
  const r = parseInt(hex.slice(1, 3), 16) || 0;
  const g = parseInt(hex.slice(3, 5), 16) || 0;
  const b = parseInt(hex.slice(5, 7), 16) || 0;
  return { r, g, b };
}

// グラデーション生成ヘルパー
function getCanvasFillOrStroke(ctx, o, bounds, fallbackColor) {
  if (o.fillMode === 'gradient' && bounds) {
    let grad;
    const { x, y, w, h } = bounds;
    const c1 = o.gradColor1 || '#4BEFFF';
    const c2 = o.gradColor2 || '#0066FF';
    switch (o.gradDirection) {
      case 'toRight':
        grad = ctx.createLinearGradient(x, y, x + Math.max(1, w), y);
        break;
      case 'toBottomRight':
        grad = ctx.createLinearGradient(x, y, x + Math.max(1, w), y + Math.max(1, h));
        break;
      case 'radial': {
        const cx = x + w / 2;
        const cy = y + h / 2;
        const r = Math.max(w, h) / 2;
        grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(1, r));
        break;
      }
      case 'toBottom':
      default:
        grad = ctx.createLinearGradient(x, y, x, y + Math.max(1, h));
        break;
    }
    grad.addColorStop(0, c1);
    grad.addColorStop(1, c2);
    return grad;
  }
  return o.color || fallbackColor;
}

// 立体 影 (Shadow) 適用ヘルパー
function applyShadowToCtx(ctx, o) {
  if (o.shadowEnable) {
    const angle = (o.shadowAngle != null ? o.shadowAngle : 45) * Math.PI / 180;
    const dist = o.shadowOffset != null ? o.shadowOffset : 6;
    const blur = o.shadowBlur != null ? o.shadowBlur : 8;
    const opacity = (o.shadowOpacity != null ? o.shadowOpacity : 60) / 100;
    const hex = o.shadowColor || '#000000';
    const rgb = hexToRgb(hex);

    ctx.shadowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
    ctx.shadowBlur = blur;
    ctx.shadowOffsetX = Math.round(Math.cos(angle) * dist);
    ctx.shadowOffsetY = Math.round(Math.sin(angle) * dist);
  } else {
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }
}

// 立体 艶 (Gloss / 光沢) 描画ヘルパー
function renderGlossEffect(ctx, o, b, fillOrStroke) {
  if (!o.glossEnable || !b || b.w <= 0 || b.h <= 0) return;

  const intensity = (o.glossIntensity != null ? o.glossIntensity : 50) / 100;
  const glossType = o.glossType || 'top';

  ctx.save();
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // テキストオブジェクトの場合の艶処理（文字の立体感）
  if (o.type === 'text') {
    ctx.font = `bold ${o.size}px ${o.fontFamily || "'Outfit', 'Noto Sans JP', sans-serif"}`;
    ctx.textBaseline = 'top';

    if (glossType === 'top') {
      // 文字の上半分に白いガラスハイライト
      const topGrad = ctx.createLinearGradient(b.x, b.y, b.x, b.y + b.h * 0.55);
      topGrad.addColorStop(0, `rgba(255, 255, 255, ${0.9 * intensity})`);
      topGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = topGrad;
      ctx.fillText(o.text, o.x, o.y);
    } else if (glossType === 'bevel') {
      // 3D浮き彫り立体文字（左上白ハイライト ＋ 右下黒シャドウ）
      ctx.fillStyle = `rgba(255, 255, 255, ${0.85 * intensity})`;
      ctx.fillText(o.text, o.x - 1, o.y - 1);
      ctx.fillStyle = `rgba(0, 0, 0, ${0.7 * intensity})`;
      ctx.fillText(o.text, o.x + 1, o.y + 1);
      ctx.fillStyle = fillOrStroke;
      ctx.fillText(o.text, o.x, o.y);
    } else if (glossType === 'glow') {
      // ネオングロー発光
      ctx.shadowColor = `rgba(255, 255, 255, ${0.9 * intensity})`;
      ctx.shadowBlur = 10;
      ctx.fillStyle = `rgba(255, 255, 255, ${0.6 * intensity})`;
      ctx.fillText(o.text, o.x, o.y);
    }
    ctx.restore();
    return;
  }

  // 図形（rect, circle, line, pen）の場合の艶処理
  ctx.save();
  ctx.beginPath();
  if (o.type === 'circle' || o.type === 'circleFill') {
    ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
  } else if (o.type === 'rect' || o.type === 'rectFill') {
    ctx.rect(o.x, o.y, o.w, o.h);
  } else {
    ctx.rect(b.x, b.y, b.w, b.h);
  }
  ctx.clip();

  if (glossType === 'top') {
    // 1. ガラスドーム光沢（上部ハイライト反射）
    const topGrad = ctx.createLinearGradient(b.x, b.y, b.x, b.y + b.h * 0.55);
    topGrad.addColorStop(0, `rgba(255, 255, 255, ${0.9 * intensity})`);
    topGrad.addColorStop(0.5, `rgba(255, 255, 255, ${0.35 * intensity})`);
    topGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = topGrad;

    ctx.beginPath();
    ctx.moveTo(b.x - 2, b.y - 2);
    ctx.lineTo(b.x + b.w + 2, b.y - 2);
    ctx.lineTo(b.x + b.w + 2, b.y + b.h * 0.42);
    ctx.bezierCurveTo(
      b.x + b.w * 0.65, b.y + b.h * 0.55,
      b.x + b.w * 0.35, b.y + b.h * 0.55,
      b.x - 2, b.y + b.h * 0.42
    );
    ctx.closePath();
    ctx.fill();
  } else if (glossType === 'bevel') {
    // 2. 3Dベベル（浮き彫り立体エッジ）
    const bevelW = Math.max(2, Math.round(Math.min(b.w, b.h) * 0.08));
    ctx.lineWidth = bevelW;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (o.type === 'circle' || o.type === 'circleFill') {
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.85 * intensity})`;
      ctx.beginPath();
      ctx.arc(o.x, o.y, Math.max(1, o.r - bevelW / 2), Math.PI * 0.75, Math.PI * 1.75);
      ctx.stroke();

      ctx.strokeStyle = `rgba(0, 0, 0, ${0.7 * intensity})`;
      ctx.beginPath();
      ctx.arc(o.x, o.y, Math.max(1, o.r - bevelW / 2), Math.PI * 1.75, Math.PI * 0.75);
      ctx.stroke();
    } else {
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.85 * intensity})`;
      ctx.beginPath();
      ctx.moveTo(b.x, b.y + b.h);
      ctx.lineTo(b.x, b.y);
      ctx.lineTo(b.x + b.w, b.y);
      ctx.stroke();

      ctx.strokeStyle = `rgba(0, 0, 0, ${0.7 * intensity})`;
      ctx.beginPath();
      ctx.moveTo(b.x + b.w, b.y);
      ctx.lineTo(b.x + b.w, b.y + b.h);
      ctx.lineTo(b.x, b.y + b.h);
      ctx.stroke();
    }
  } else if (glossType === 'glow') {
    // 3. ネオングロー（艶やかインナー発光）
    const cx = b.x + b.w / 2;
    const cy = b.y + b.h / 2;
    const maxR = Math.max(b.w, b.h) / 2;
    const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(1, maxR));
    glowGrad.addColorStop(0, `rgba(255, 255, 255, ${0.9 * intensity})`);
    glowGrad.addColorStop(0.5, `rgba(255, 255, 255, ${0.35 * intensity})`);
    glowGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = glowGrad;
    ctx.fillRect(b.x, b.y, b.w, b.h);
  }
  ctx.restore();
  ctx.restore();
}

// レイヤー個別フィルター（透明度、ぼかし、尖鋭化）をコンテキストに適用
function applyFiltersToCtx(ctx, o) {
  // 1. 透明度 (不透明度)
  const op = (o.opacity != null ? o.opacity : 100) / 100;
  ctx.globalAlpha = Math.max(0, Math.min(1, op));

  // 2. ぼかし (Blur) & 3. 尖鋭化 (アンシャープ / Sharpen)
  const filterList = [];

  if (o.blur && o.blur > 0) {
    filterList.push(`blur(${o.blur}px)`);
  }

  if (o.sharpen && o.sharpen > 0) {
    // 尖鋭化（コントラストと輪郭のエッジのキリッとした引き締め）
    const contrastVal = 100 + o.sharpen * 0.9;
    const brightnessVal = 100 + o.sharpen * 0.05;
    const saturateVal = 100 + o.sharpen * 0.1;
    filterList.push(`contrast(${contrastVal}%) brightness(${brightnessVal}%) saturate(${saturateVal}%)`);
  }

  if (filterList.length > 0) {
    ctx.filter = filterList.join(' ');
  } else {
    ctx.filter = 'none';
  }
}

// 再描画
function redraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const o of objects) {
    // 消しゴム（透明化）
    if (o.type === 'eraser' && o.points && o.points.length > 0) {
      ctx.save();
      if (o.rotation) {
        const eb = getObjectBounds(o);
        if (eb) {
          const cx = eb.x + eb.w / 2;
          const cy = eb.y + eb.h / 2;
          ctx.translate(cx, cy);
          ctx.rotate((o.rotation * Math.PI) / 180);
          ctx.translate(-cx, -cy);
        }
      }
      applyFiltersToCtx(ctx, o);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
      ctx.fillStyle = 'rgba(0,0,0,1)';
      ctx.lineWidth = o.size || 8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      if (o.points.length === 1) {
        ctx.arc(o.points[0].x, o.points[0].y, (o.size || 4) / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        for (let i = 0; i < o.points.length - 1; i++) {
          ctx.moveTo(o.points[i].x, o.points[i].y);
          ctx.lineTo(o.points[i + 1].x, o.points[i + 1].y);
        }
        ctx.stroke();
      }
      ctx.restore();
      continue;
    }

    const b = getObjectBounds(o);

    ctx.save();
    if (o.rotation && b) {
      const cx = b.x + b.w / 2;
      const cy = b.y + b.h / 2;
      ctx.translate(cx, cy);
      ctx.rotate((o.rotation * Math.PI) / 180);
      ctx.translate(-cx, -cy);
    }
    applyFiltersToCtx(ctx, o);
    applyShadowToCtx(ctx, o);

    const fillOrStroke = getCanvasFillOrStroke(ctx, o, b, o.color || '#4BEFFF');
    ctx.strokeStyle = fillOrStroke;
    ctx.fillStyle = fillOrStroke;
    ctx.lineWidth = o.size || 1;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // ペン
    if (o.type === 'pen' && o.points && o.points.length > 0) {
      ctx.beginPath();
      if (o.points.length === 1) {
        ctx.arc(o.points[0].x, o.points[0].y, (o.size || 2) / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        for (let i = 0; i < o.points.length - 1; i++) {
          ctx.moveTo(o.points[i].x, o.points[i].y);
          ctx.lineTo(o.points[i + 1].x, o.points[i + 1].y);
        }
        ctx.stroke();
      }
      renderGlossEffect(ctx, o, b, fillOrStroke);
    }

    // 直線
    else if (o.type === 'line') {
      ctx.beginPath();
      ctx.moveTo(o.x1, o.y1);
      ctx.lineTo(o.x2, o.y2);
      ctx.stroke();
      renderGlossEffect(ctx, o, b, fillOrStroke);
    }

    // 四角
    else if (o.type === 'rect') {
      ctx.strokeRect(o.x, o.y, o.w, o.h);
      renderGlossEffect(ctx, o, b, fillOrStroke);
    }
    else if (o.type === 'rectFill') {
      ctx.fillRect(o.x, o.y, o.w, o.h);
      renderGlossEffect(ctx, o, b, fillOrStroke);
    }

    // 円
    else if (o.type === 'circle') {
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.stroke();
      renderGlossEffect(ctx, o, b, fillOrStroke);
    }
    else if (o.type === 'circleFill') {
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.fill();
      renderGlossEffect(ctx, o, b, fillOrStroke);
    }

    // テキスト
    else if (o.type === 'text') {
      ctx.font = `bold ${o.size}px ${o.fontFamily || "'Outfit', 'Noto Sans JP', sans-serif"}`;
      ctx.textBaseline = 'top';
      ctx.fillText(o.text, o.x, o.y);
      renderGlossEffect(ctx, o, b, fillOrStroke);
    }

    // 画像レイヤー
    else if (o.type === 'image') {
      if (o.imgElement && o.imgElement.complete) {
        ctx.drawImage(o.imgElement, o.x, o.y, o.w, o.h);
        renderGlossEffect(ctx, o, b, fillOrStroke);
      }
    }

    ctx.restore();
  }

  // 描画中のガイド線・予定枠プレビュー表示（オブジェクト選択中・変形中・移動中は非表示）
  if (drawing && currentDragPos && !activeHandle && !isDraggingObject && !selectedObject && ['line', 'rect', 'rectFill', 'circle', 'circleFill'].includes(toolSelect.value)) {
    drawGuidePreview(ctx, toolSelect.value, startX, startY, currentDragPos);
  }

  // 選択枠 & 8つのリサイズハンドル（4角＋4辺の中央）＆ 正確なpixelサイズ表示
  if (selectedObject) {
    drawSelectionBox(ctx, selectedObject);
  }

  // キャンバス下部のステータス表示（オブジェクトのpixelサイズと位置を常時表示）
  const canvasInfoEl = document.getElementById('canvasInfo');
  if (canvasInfoEl) {
    if (selectedObject) {
      const sb = getObjectBounds(selectedObject);
      if (sb) {
        const rotStr = selectedObject.rotation ? ` 角度: ${selectedObject.rotation}°` : '';
        canvasInfoEl.textContent = `選択サイズ: ${Math.round(sb.w)} × ${Math.round(sb.h)} px (X:${Math.round(sb.x)}, Y:${Math.round(sb.y)})${rotStr}`;
        canvasInfoEl.style.color = 'var(--accent-cyan)';
      }
    } else {
      canvasInfoEl.textContent = '256 × 256 px';
      canvasInfoEl.style.color = '';
    }
  }

  updateLayerPanel();
}

// レイヤーパネル更新
let dragIndex = null;
function updateLayerPanel() {
  const panel = document.getElementById('layerPanel');
  if (!panel) return;
  panel.innerHTML = "";

  const dict = i18nData[currentLanguage] || i18nData.ja;

  if (objects.length === 0) {
    panel.innerHTML = '<div class="layer-empty-msg">' + (dict.layer_empty_msg || 'レイヤーはありません<br>描画すると追加されます') + '</div>';
    return;
  }

  // 最新レイヤーが上に来るように逆順で表示
  for (let i = objects.length - 1; i >= 0; i--) {
    const obj = objects[i];
    const index = i;

    const card = document.createElement('div');
    card.className = "layerCard";
    card.draggable = true;
    card.style.zIndex = (i + 1);
    if (selectedObject === obj) card.classList.add("selected");

    const icon = document.createElement('div');
    icon.className = "layerIcon";

    let iconChar = "🔹";
    let label = dict.layer_panel_title || "Layer";

    if (obj.type === 'text') { iconChar = "🔤"; label = `"${obj.text.slice(0, 8)}"`; }
    else if (obj.type === 'rect' || obj.type === 'rectFill') { iconChar = "▢"; label = dict.layer_rect || "四角"; }
    else if (obj.type === 'circle' || obj.type === 'circleFill') { iconChar = "◯"; label = dict.layer_circle || "円"; }
    else if (obj.type === 'line') { iconChar = "📏"; label = dict.layer_line || "直線"; }
    else if (obj.type === 'pen') { iconChar = "✏️"; label = dict.layer_pen || "ペン"; }
    else if (obj.type === 'eraser') { iconChar = "🧹"; label = dict.layer_eraser || "消しゴム"; }
    else if (obj.type === 'image') { iconChar = "🖼️"; label = dict.layer_image || "画像"; }

    icon.textContent = iconChar;

    const textSpan = document.createElement('span');
    textSpan.style.flex = "1";
    textSpan.style.overflow = "hidden";
    textSpan.style.textOverflow = "ellipsis";
    textSpan.style.whiteSpace = "nowrap";

    let fxBadge = "";
    if (obj.opacity != null && obj.opacity < 100) fxBadge += ` ${obj.opacity}%`;
    if (obj.blur && obj.blur > 0) fxBadge += ` ぼかし:${obj.blur}px`;
    if (obj.sharpen && obj.sharpen > 0) fxBadge += ` 尖鋭:${obj.sharpen}%`;
    if (obj.rotation) fxBadge += ` ↷${obj.rotation}°`;

    textSpan.textContent = `#${index + 1} ${label}` + (fxBadge ? ` (${fxBadge.trim()})` : "");
    if (fxBadge) textSpan.title = fxBadge.trim();

    // レイヤー削除ボタン (☒)
    const deleteBtn = document.createElement('button');
    deleteBtn.className = "layer-delete-btn";
    deleteBtn.textContent = "☒";
    deleteBtn.title = dict.layer_delete_tip || "このレイヤーを削除";
    deleteBtn.onclick = (e) => {
      e.stopPropagation();
      saveState();
      objects.splice(index, 1);
      if (selectedObject === obj) selectedObject = null;
      redraw();
      showToast(dict.toast_layer_deleted || "🗑 レイヤーを削除しました");
    };

    card.appendChild(icon);
    card.appendChild(textSpan);
    card.appendChild(deleteBtn);

    card.onclick = () => {
      selectedObject = (selectedObject === obj) ? null : obj;
      if (selectedObject) {
        isSelectModeActive = true;
        if (selectTransformBtn) selectTransformBtn.classList.add('active');
        syncEffectControlsWithObject(selectedObject);
      } else {
        isSelectModeActive = false;
        if (selectTransformBtn) selectTransformBtn.classList.remove('active');
      }
      redraw();
    };

    card.addEventListener('dragstart', () => { dragIndex = index; });
    card.addEventListener('dragover', (e) => { e.preventDefault(); });
    card.addEventListener('drop', () => {
      if (dragIndex === null || dragIndex === index) return;
      saveState();
      const temp = objects[dragIndex];
      objects.splice(dragIndex, 1);
      objects.splice(index, 0, temp);
      dragIndex = null;
      redraw();
    });

    panel.appendChild(card);
  }
}

// ==========================================
// 4. 画像アップロードモード（Mode B）
// ==========================================
const dropZone = document.getElementById('dropZone');
const imageInput = document.getElementById('imageInput');
const selectFileBtn = document.getElementById('selectFileBtn');
const previewCanvas = document.getElementById('previewCanvas');
const previewCtx = previewCanvas.getContext('2d');
const fitModeSelect = document.getElementById('fitModeSelect');
const uploadBgColor = document.getElementById('uploadBgColor');
const uploadFileInfo = document.getElementById('uploadFileInfo');
const sendToCanvasBtn = document.getElementById('sendToCanvasBtn');

let currentUploadedImage = null;

// ファイル選択イベント
selectFileBtn.addEventListener('click', () => imageInput.click());
dropZone.addEventListener('click', (e) => {
  if (e.target !== selectFileBtn) imageInput.click();
});

imageInput.addEventListener('change', (e) => {
  if (e.target.files && e.target.files[0]) {
    processImageFile(e.target.files[0]);
  }
});

// ドラッグ＆ドロップ
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    processImageFile(e.dataTransfer.files[0]);
  }
});

// 画像ファイル読み込み & EXIF向き補正
function processImageFile(file) {
  if (!file.type.startsWith('image/')) {
    alert('画像ファイルを選択してください');
    return;
  }

  trackEvent('upload_image', { file_type: file.type });

  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      // EXIF向き取得
      if (window.EXIF) {
        EXIF.getData(img, function() {
          const orientation = EXIF.getTag(this, "Orientation") || 1;
          currentUploadedImage = orientImage(img, orientation);
          renderUploadPreview();
          uploadFileInfo.textContent = `${file.name} (${img.width}×${img.height}px)`;
          showToast(`📁 画像を読み込みました: ${file.name}`);
        });
      } else {
        currentUploadedImage = img;
        renderUploadPreview();
        uploadFileInfo.textContent = `${file.name} (${img.width}×${img.height}px)`;
        showToast(`📁 画像を読み込みました: ${file.name}`);
      }
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

// スマホ写真のEXIF向き補正用オフスクリーンキャンバス
function orientImage(img, orientation) {
  const oc = document.createElement('canvas');
  const octx = oc.getContext('2d');
  let width = img.width;
  let height = img.height;

  if (orientation >= 5 && orientation <= 8) {
    oc.width = height;
    oc.height = width;
  } else {
    oc.width = width;
    oc.height = height;
  }

  switch (orientation) {
    case 2: octx.transform(-1, 0, 0, 1, width, 0); break;
    case 3: octx.transform(-1, 0, 0, -1, width, height); break;
    case 4: octx.transform(1, 0, 0, -1, 0, height); break;
    case 5: octx.transform(0, 1, 1, 0, 0, 0); break;
    case 6: octx.transform(0, 1, -1, 0, height, 0); break;
    case 7: octx.transform(0, -1, -1, 0, height, width); break;
    case 8: octx.transform(0, -1, 1, 0, 0, width); break;
    default: break;
  }

  octx.drawImage(img, 0, 0);
  return oc;
}

// アップロードプレビューの描画
function renderUploadPreview() {
  if (!currentUploadedImage) return;

  const w = previewCanvas.width;
  const h = previewCanvas.height;
  const fitMode = fitModeSelect.value;
  const bg = uploadBgColor.value;

  previewCtx.clearRect(0, 0, w, h);

  // 背景色
  if (bg !== 'transparent') {
    previewCtx.fillStyle = bg;
    previewCtx.fillRect(0, 0, w, h);
    previewCanvas.classList.remove('checkerboard-bg');
    previewCanvas.style.backgroundColor = bg;
  } else {
    previewCanvas.classList.add('checkerboard-bg');
    previewCanvas.style.backgroundColor = '';
  }

  const imgW = currentUploadedImage.width;
  const imgH = currentUploadedImage.height;

  if (fitMode === 'stretch') {
    previewCtx.drawImage(currentUploadedImage, 0, 0, w, h);
  } else if (fitMode === 'contain') {
    const scale = Math.min(w / imgW, h / imgH);
    const destW = imgW * scale;
    const destH = imgH * scale;
    const destX = (w - destW) / 2;
    const destY = (h - destH) / 2;
    previewCtx.drawImage(currentUploadedImage, destX, destY, destW, destH);
  } else { // cover (中央トリミング)
    const scale = Math.max(w / imgW, h / imgH);
    const srcW = w / scale;
    const srcH = h / scale;
    const srcX = (imgW - srcW) / 2;
    const srcY = (imgH - srcH) / 2;
    previewCtx.drawImage(currentUploadedImage, srcX, srcY, srcW, srcH, 0, 0, w, h);
  }
}

fitModeSelect.addEventListener('change', renderUploadPreview);
uploadBgColor.addEventListener('change', renderUploadPreview);

// サンプルアイコンの読み込み機能（ローカルfile:///環境でもCORSエラーなく確実に読み込めるようData URLに対応）
function loadSampleIcon(srcOrDataUrl, title) {
  const img = new Image();
  // 注意: file:// プロトコルでは crossOrigin を設定するとブラウザのCORSポリシーにより読み込み失敗するため設定しない
  img.onload = function() {
    currentUploadedImage = img;
    renderUploadPreview();
    uploadFileInfo.textContent = `${title} (${img.width}×${img.height}px)`;
    showToast(`💡 サンプル「${title}」を読み込みました！`);
  };
  img.onerror = function() {
    showToast(`⚠️ サンプル画像の読み込みに失敗しました: ${title}`);
  };
  img.src = srcOrDataUrl;
}

document.querySelectorAll('.sample-icon-card').forEach(card => {
  card.addEventListener('click', () => {
    // 選択アクティブ表示
    document.querySelectorAll('.sample-icon-card').forEach(c => c.classList.remove('active-sample'));
    card.classList.add('active-sample');

    const key = card.getAttribute('data-key');
    const name = card.getAttribute('data-name');
    const dataUrl = (typeof SAMPLE_ICONS_DATA !== 'undefined' && SAMPLE_ICONS_DATA[key])
      ? SAMPLE_ICONS_DATA[key]
      : card.getAttribute('data-src');
    loadSampleIcon(dataUrl, name);
  });
});

// アップロード画像の90度回転ボタン
const uploadRotate90Btn = document.getElementById('uploadRotate90Btn');
if (uploadRotate90Btn) {
  uploadRotate90Btn.addEventListener('click', () => {
    if (!currentUploadedImage) {
      showToast('⚠️ 回転する画像がありません。画像を先に選択してください。');
      return;
    }

    // オフスクリーンキャンバスで画像を時計回りに90度回転
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = currentUploadedImage.height;
    tempCanvas.height = currentUploadedImage.width;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.translate(tempCanvas.width / 2, tempCanvas.height / 2);
    tempCtx.rotate(Math.PI / 2);
    tempCtx.drawImage(currentUploadedImage, -currentUploadedImage.width / 2, -currentUploadedImage.height / 2);

    const rotatedImg = new Image();
    rotatedImg.onload = () => {
      currentUploadedImage = rotatedImg;
      renderUploadPreview();
      showToast('↷ 画像を90°回転しました！');
    };
    rotatedImg.src = tempCanvas.toDataURL();
  });
}

// アップロード画像をキャンバスレイヤーとして転送
sendToCanvasBtn.addEventListener('click', () => {
  if (!currentUploadedImage) {
    alert('先に画像を選択またはドロップしてください。');
    return;
  }

  const dataUrl = previewCanvas.toDataURL('image/png');
  const img = new Image();
  img.onload = () => {
    saveState();
    const eff = getCurrentEffectSettings();
    objects.push({
      type: "image",
      imgElement: img,
      dataUrl: dataUrl,
      x: 0,
      y: 0,
      w: 256,
      h: 256,
      ...eff
    });
    setMode('canvas');
    redraw();
    showToast('🎨 画像をキャンバスに転送しました！上から描画できます');
  };
  img.src = dataUrl;
});

// ==========================================
// 5. アイコン生成 & ダウンロード
// (iPhone, Android, Windows ICO, PNG, ZIP)
// ==========================================

// オフスクリーンキャンバスで指定解像度に高品質リサイズ
function resizeCanvas(sourceCanvas, targetSize, fillBgColor = null) {
  const c = document.createElement('canvas');
  c.width = targetSize;
  c.height = targetSize;
  const cctx = c.getContext('2d');
  cctx.imageSmoothingEnabled = true;
  cctx.imageSmoothingQuality = 'high';

  if (fillBgColor) {
    cctx.fillStyle = fillBgColor;
    cctx.fillRect(0, 0, targetSize, targetSize);
  }
  cctx.drawImage(sourceCanvas, 0, 0, targetSize, targetSize);
  return c;
}

// ダウンロード実行ヘルパー（フォールバック用）
function triggerDownload(url, filename) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// 保存先フォルダ・ファイル名指定ダイアログ（File System Access API）またはダウンロード実行
async function saveBlobWithPicker(blob, defaultFilename, fileType = 'png') {
  if (window.showSaveFilePicker) {
    try {
      const typeMap = {
        png: { description: 'PNG 画像ファイル', accept: { 'image/png': ['.png'] } },
        ico: { description: 'Windows アイコンファイル', accept: { 'image/x-icon': ['.ico'] } },
        zip: { description: 'ZIP アーカイブ', accept: { 'application/zip': ['.zip'] } },
      };

      const options = {
        suggestedName: defaultFilename,
        types: typeMap[fileType] ? [typeMap[fileType]] : []
      };

      const handle = await window.showSaveFilePicker(options);
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      showToast(`💾 指定された場所に保存しました: ${handle.name}`);
      return;
    } catch (err) {
      if (err.name === 'AbortError') {
        showToast('ℹ️ 保存をキャンセルしました');
        return;
      }
      console.warn('showSaveFilePicker failed, fallback to standard download:', err);
    }
  }

  // フォールバック（通常ダウンロード）
  const url = URL.createObjectURL(blob);
  triggerDownload(url, defaultFilename);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast(`💾 保存しました: ${defaultFilename}`);
}

async function saveCanvasAsPNG(sourceCanvas, filename, targetSize = null, fillBgColor = null) {
  let targetCanvas = sourceCanvas;
  if (targetSize || fillBgColor) {
    targetCanvas = resizeCanvas(sourceCanvas, targetSize || sourceCanvas.width, fillBgColor);
  }

  if (targetCanvas.toBlob) {
    targetCanvas.toBlob(async (blob) => {
      if (blob) {
        await saveBlobWithPicker(blob, filename, 'png');
      } else {
        triggerDownload(targetCanvas.toDataURL('image/png'), filename);
        showToast(`💾 保存しました: ${filename}`);
      }
    }, 'image/png');
  } else {
    triggerDownload(targetCanvas.toDataURL('image/png'), filename);
    showToast(`💾 保存しました: ${filename}`);
  }
}

// マルチサイズ対応 Windows ICO 生成 (16, 32, 48, 64, 128, 256)
function canvasToPngBytes(canvasElement) {
  const dataUrl = canvasElement.toDataURL('image/png');
  const base64 = dataUrl.split(',')[1];
  const byteString = atob(base64);
  const bytes = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    bytes[i] = byteString.charCodeAt(i);
  }
  return bytes;
}

function createMultiSizeIco(sourceCanvas) {
  const sizes = [16, 32, 48, 64, 128, 256];
  const images = sizes.map(size => {
    const resized = resizeCanvas(sourceCanvas, size);
    return {
      size: size,
      bytes: canvasToPngBytes(resized)
    };
  });

  const count = images.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let currentOffset = headerSize + (dirEntrySize * count);

  const totalSize = currentOffset + images.reduce((sum, img) => sum + img.bytes.length, 0);
  const ico = new Uint8Array(totalSize);

  // ICOヘッダ (6 bytes)
  ico[0] = 0; ico[1] = 0;       // reserved
  ico[2] = 1; ico[3] = 0;       // type = 1 (icon)
  ico[4] = count & 0xFF;        // count low
  ico[5] = (count >> 8) & 0xFF; // count high

  // ディレクトリエントリ (16 bytes each) & 画像バイナリ配置
  images.forEach((img, i) => {
    const entryOffset = headerSize + i * dirEntrySize;
    const w = img.size >= 256 ? 0 : img.size;
    const h = img.size >= 256 ? 0 : img.size;
    const len = img.bytes.length;

    ico[entryOffset + 0] = w;
    ico[entryOffset + 1] = h;
    ico[entryOffset + 2] = 0;     // colors
    ico[entryOffset + 3] = 0;     // reserved
    ico[entryOffset + 4] = 1; ico[entryOffset + 5] = 0; // planes
    ico[entryOffset + 6] = 32; ico[entryOffset + 7] = 0; // bpp

    ico[entryOffset + 8] = len & 0xFF;
    ico[entryOffset + 9] = (len >> 8) & 0xFF;
    ico[entryOffset + 10] = (len >> 16) & 0xFF;
    ico[entryOffset + 11] = (len >> 24) & 0xFF;

    ico[entryOffset + 12] = currentOffset & 0xFF;
    ico[entryOffset + 13] = (currentOffset >> 8) & 0xFF;
    ico[entryOffset + 14] = (currentOffset >> 16) & 0xFF;
    ico[entryOffset + 15] = (currentOffset >> 24) & 0xFF;

    ico.set(img.bytes, currentOffset);
    currentOffset += len;
  });

  return ico;
}

async function saveICO(sourceCanvas, filename) {
  const icoBytes = createMultiSizeIco(sourceCanvas);
  const blob = new Blob([icoBytes], { type: 'image/x-icon' });
  await saveBlobWithPicker(blob, filename, 'ico');
}

// 全サイズ一括ZIPパッケージ作成
async function saveAllInZip(sourceCanvas, isModeA = true) {
  if (!window.JSZip) {
    alert("ZIP生成ライブラリの読み込み中です。少々お待ちください。");
    return;
  }

  showToast("📦 ZIPパッケージを作成中...");
  const zip = new JSZip();

  const fillForIos = isModeA 
    ? document.getElementById('fillBgForIosA').checked 
    : document.getElementById('fillBgForIosB').checked;

  const iosBg = fillForIos ? "#ffffff" : null;

  // 1. iPhone用 (apple-touch-icon.png 180x180)
  const iosCanvas = resizeCanvas(sourceCanvas, 180, iosBg);
  zip.file("apple-touch-icon.png", canvasToPngBytes(iosCanvas));

  // 2. Android / PWA用 (192x192, 512x512)
  const a192 = resizeCanvas(sourceCanvas, 192);
  zip.file("android-chrome-192x192.png", canvasToPngBytes(a192));

  const a512 = resizeCanvas(sourceCanvas, 512);
  zip.file("android-chrome-512x512.png", canvasToPngBytes(a512));

  // 3. ファビコン用 (favicon-32x32.png, favicon-16x16.png)
  const f32 = resizeCanvas(sourceCanvas, 32);
  zip.file("favicon-32x32.png", canvasToPngBytes(f32));

  const f16 = resizeCanvas(sourceCanvas, 16);
  zip.file("favicon-16x16.png", canvasToPngBytes(f16));

  // 4. Windows / マルチサイズICO (favicon.ico)
  const icoBytes = createMultiSizeIco(sourceCanvas);
  zip.file("favicon.ico", icoBytes);

  // 5. PWA設定ファイル (manifest.json)
  const manifest = {
    name: "My App",
    short_name: "App",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    theme_color: "#0A0F1F",
    background_color: "#0A0F1F",
    display: "standalone"
  };
  zip.file("manifest.json", JSON.stringify(manifest, null, 2));

  // 6. 組み込み用HTMLスニペット (index_head_tags.html)
  const headSnippet = `<!-- Webアプリ / PWA HTML <head> に貼り付けるタグ -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.json">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="My App">
<meta name="theme-color" content="#0A0F1F">
`;
  zip.file("index_head_tags.html", headSnippet);

  // 7. README説明書
  const readme = `=== IMP (Icon Maker Pro) アイコンパッケージ ===

【同封ファイル一覧】
- apple-touch-icon.png (180x180) : iPhone / iPad ホーム画面用アイコン
- android-chrome-192x192.png   : Android / PWA 標準アプリアイコン
- android-chrome-512x512.png   : Android / PWA 高精細スプラッシュ画面用アイコン
- favicon-32x32.png            : ブラウザタブ用ファビコン
- favicon-16x16.png            : ブラウザタブ用小サイズファビコン
- favicon.ico                  : Windows / ブラウザ用マルチサイズICO
- manifest.json                : PWA設定ファイル
- index_head_tags.html         : HTMLの<head>内に貼り付けるコード

【使い方】
1. これらの画像と manifest.json をWebサイトのルート階層に配置します。
2. index_head_tags.html のコードを既存サイトの index.html の <head> 内に貼り付けます。
これでiPhone、Android、PCすべてのブラウザで完璧にアイコンが表示されます！
`;
  zip.file("README.txt", readme);

  const content = await zip.generateAsync({ type: "blob" });
  const filename = isModeA ? "imp_canvas_icons.zip" : "imp_image_icons.zip";
  await saveBlobWithPicker(content, filename, "zip");
}

// ------------------------------------------
// 各種ダウンロードボタンのイベント割り当て
// ------------------------------------------

// キャンバス保存時に選択枠や回転ハンドルを除外してクリーンに保存するヘルパー
function withCleanCanvasExport(action) {
  const prevSelected = selectedObject;
  if (prevSelected) {
    selectedObject = null;
    redraw();
  }
  try {
    action();
  } finally {
    if (prevSelected) {
      selectedObject = prevSelected;
      redraw();
    }
  }
}

// Mode A (キャンバス)
document.getElementById('downloadIosA').addEventListener('click', () => {
  trackEvent('export_icon', { platform: 'ios', mode: 'canvas' });
  withCleanCanvasExport(() => {
    const fill = document.getElementById('fillBgForIosA').checked ? "#ffffff" : null;
    saveCanvasAsPNG(canvas, 'apple-touch-icon.png', 180, fill);
  });
});

document.getElementById('downloadAndroid192A').addEventListener('click', () => {
  trackEvent('export_icon', { platform: 'android_192', mode: 'canvas' });
  withCleanCanvasExport(() => {
    saveCanvasAsPNG(canvas, 'android-chrome-192x192.png', 192);
  });
});

document.getElementById('downloadAndroid512A').addEventListener('click', () => {
  trackEvent('export_icon', { platform: 'android_512', mode: 'canvas' });
  withCleanCanvasExport(() => {
    saveCanvasAsPNG(canvas, 'android-chrome-512x512.png', 512);
  });
});

document.getElementById('downloadIcoA').addEventListener('click', () => {
  trackEvent('export_icon', { platform: 'ico', mode: 'canvas' });
  withCleanCanvasExport(() => {
    saveICO(canvas, 'favicon.ico');
  });
});

document.getElementById('downloadPngA').addEventListener('click', () => {
  trackEvent('export_icon', { platform: 'png', mode: 'canvas' });
  withCleanCanvasExport(() => {
    saveCanvasAsPNG(canvas, 'imp_canvas.png', 256);
  });
});

document.getElementById('downloadZipA').addEventListener('click', () => {
  trackEvent('export_icon', { platform: 'zip_all', mode: 'canvas' });
  withCleanCanvasExport(() => {
    saveAllInZip(canvas, true);
  });
});

// Mode B (画像アップロード)
document.getElementById('downloadIosB').addEventListener('click', () => {
  trackEvent('export_icon', { platform: 'ios', mode: 'upload' });
  const fill = document.getElementById('fillBgForIosB').checked ? "#ffffff" : null;
  saveCanvasAsPNG(previewCanvas, 'apple-touch-icon.png', 180, fill);
});

document.getElementById('downloadAndroid192B').addEventListener('click', () => {
  trackEvent('export_icon', { platform: 'android_192', mode: 'upload' });
  saveCanvasAsPNG(previewCanvas, 'android-chrome-192x192.png', 192);
});

document.getElementById('downloadAndroid512B').addEventListener('click', () => {
  trackEvent('export_icon', { platform: 'android_512', mode: 'upload' });
  saveCanvasAsPNG(previewCanvas, 'android-chrome-512x512.png', 512);
});

document.getElementById('downloadIcoB').addEventListener('click', () => {
  trackEvent('export_icon', { platform: 'ico', mode: 'upload' });
  saveICO(previewCanvas, 'favicon.ico');
});

document.getElementById('downloadPngB').addEventListener('click', () => {
  trackEvent('export_icon', { platform: 'png', mode: 'upload' });
  saveCanvasAsPNG(previewCanvas, 'imp_image.png', 256);
});

document.getElementById('downloadZipB').addEventListener('click', () => {
  trackEvent('export_icon', { platform: 'zip_all', mode: 'upload' });
  saveAllInZip(previewCanvas, false);
});

// ==========================================
// 6. コードスニペットのワンクリックコピー
// ==========================================
const copySnippetBtn = document.getElementById('copySnippetBtn');
const snippetCode = document.getElementById('snippetCode');

copySnippetBtn.addEventListener('click', () => {
  trackEvent('copy_html_code');
  const text = snippetCode.innerText;
  const dict = i18nData[currentLanguage] || i18nData.ja;
  navigator.clipboard.writeText(text).then(() => {
    copySnippetBtn.textContent = dict.btn_copied_code || '✅ コピー完了！';
    const toastMsg = currentLanguage === 'ja' ? '📋 HTMLコードをクリップボードにコピーしました！' : '📋 HTML code copied to clipboard!';
    showToast(toastMsg);
    setTimeout(() => {
      copySnippetBtn.textContent = dict.btn_copy_code || '📋 コードをコピー';
    }, 2000);
  }).catch(() => {
    showToast('⚠️ Copy failed.');
  });
});

// ==========================================
// 7. トースト通知ヘルパー
// ==========================================
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.remove('hidden');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add('hidden');
  }, 2600);
}

// ==========================================
// 8. PWA & Service Worker 完全自動更新制御
// (ユーザー操作不要・更新検知時に自動適用し、更新完了時のみポップアップ通知)
// ==========================================
let swRegistration = null;

function checkShowUpdatedPopup() {
  try {
    if (sessionStorage.getItem('imp_app_updated_flag') === 'true' || localStorage.getItem('imp_app_just_updated') === 'true') {
      sessionStorage.removeItem('imp_app_updated_flag');
      localStorage.removeItem('imp_app_just_updated');
      setTimeout(() => {
        const dict = (typeof i18nData !== 'undefined' && i18nData[currentLanguage]) ? i18nData[currentLanguage] : { toast_update_completed: "🚀 最新バージョンに更新されました！" };
        showToast(dict.toast_update_completed || "🚀 最新バージョンに更新されました！");
      }, 1000);
    }
  } catch (e) {}
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    // 起動時に更新後ポップアップを表示判定
    checkShowUpdatedPopup();

    navigator.serviceWorker.register('./sw.js?v=1.0.13')
      .then((reg) => {
        swRegistration = reg;

        // すでに新しいWorkerが待機している場合は即座にアクティベート
        if (reg.waiting) {
          reg.waiting.postMessage({ type: 'SKIP_WAITING' });
        }

        // 新しいWorkerのインストールを監視し、完了したら自動スキップウェイト
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (!newWorker) return;

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // 新しいバージョンがインストールされたら即時適用
              newWorker.postMessage({ type: 'SKIP_WAITING' });
            }
          });
        });

        // 起動直後に最新版をチェック
        reg.update().catch(() => {});

        // 定期的にバックグラウンドで更新チェック (15分ごと)
        setInterval(() => {
          reg.update().catch(() => {});
        }, 15 * 60 * 1000);
      })
      .catch((err) => {
        console.warn('ServiceWorker registration error:', err);
      });

    // iOS Safari ホーム画面や Android PWA のフォアグラウンド復帰時に即座に自動チェック
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && swRegistration) {
        swRegistration.update().catch(() => {});
      }
    });

    // オンラインに復帰した時も自動チェック
    window.addEventListener('online', () => {
      if (swRegistration) {
        swRegistration.update().catch(() => {});
      }
    });

    // 新しいService Workerに切り替わったら自動的に再読み込みし、更新ポップアップフラグをセット
    let isReloading = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!isReloading) {
        isReloading = true;
        try {
          sessionStorage.setItem('imp_app_updated_flag', 'true');
          localStorage.setItem('imp_app_just_updated', 'true');
        } catch (e) {}
        window.location.reload();
      }
    });
  });
}

// 初期化
setLanguage(currentLanguage);
updateHistoryButtons();
redraw();
registerServiceWorker();