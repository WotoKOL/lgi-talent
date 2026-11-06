# 官网验收修改记录

本轮依据 2026 年 11 月 6 日提供的 `官网修改.docx`、`官网修改.zip` 及[飞书验收文档](https://i3h3m6c4zk.feishu.cn/wiki/PsLKwV4fviEuH1ktfPVcBGUynfc)实施。DOCX 与 ZIP 中的 Markdown 文本一致；附件图片已逐项对应。下表记录本轮完成项与用户明确暂缓项。

| 页面 | 已完成调整 |
| --- | --- |
| Home | 首屏改为 Influencer Marketing 和指定机构介绍；使用附件 image 37 的黑白创作者背景，加入轻微循环动效，按最新要求移除右上角播放/暂停按钮；移除原人物滑动条。Hero 保持一屏，底部仅保留圆圈箭头入口；主标题采用更舒展的 DM Sans 900，两行字号一致并增大字距。 |
| Home | 品牌 Logo 恢复原色，单行无缝循环展示；删除 Good people. Great things.、IN GOOD COMPANY 和 Connected by LGI.。取消白色圆角底框及播放按钮，采用与页面衔接的无框暖色品牌带；恢复完整副标题，支持悬停或键盘聚焦暂停。 |
| Home | 服务区改为桌面 340px 宽的等高竖图卡片，采用白色描边与黑色信息底，窄屏随可用宽度适配；支持按钮逐卡滚动、鼠标拖动整组及触摸滑动；快速连点累计目标，首尾及无溢出时禁用相应按钮，拖动不会误触链接；替换指定素材；Creator Strategy 改为 Campaign strategy。 |
| Home | 03 区替换为参考图结构的 SOME OF OUR TALENT 横向博主卡片：按最新要求使用全大写墨黑标题、与 GOOD TO KNOW 相同的米色背景、白色卡片、3px 深暖橄榄灰描边与轻阴影；View Profile 按钮无边框，采用鼠尾草绿、浅柠檬、奶油黄、杏色到柔珊瑚的多色渐变。首次进入视口时，可见卡片错落淡入上移；最后一张可见卡片入场结束后立即滚动一张，后续按正常间隔逐张无缝循环，不重复播放入场。保留左右按钮、拖动与触摸操作，悬停或聚焦时暂停。姓名、分类、粉丝量和频道链接来自 `官网博主信息.xlsx`，仅展示含嵌入头像的 11 条记录；不展示头像待补充的 UX Tech、Noxy、ManShed。 |
| Home | 原两张作品卡片按最新要求改为 For Brands / For Creators 双入口。模块标题改为 LET’S BUILD / WHAT’S NEXT.；品牌卡采用团队策划图与 Turn attention into impact. 文案，整卡跳转 `/brand-services`；创作者卡采用访谈图与 Create your way. Grow with LGI. 文案，整卡跳转 `/creators`。两卡分别增加受众说明与明确 CTA，保留黑白照片和黄色箭头；移除原 Explore our approach 及两个品牌服务锚点跳转。 |
| Brands | 替换六项能力配图；服务标题改为 Our Service；按已选方案一使用六张黑白服务图，桌面三列错落排版、手机按 01–06 顺序排列。 |
| Brands | 合作流程取消旧左右分栏，改为大标题、整幅背景图和七步横向流程，手机改为纵向流程。 |
| Creators | 首屏使用黑白访谈图，标题和按钮居中；六项服务更换附件竖图。 |
| Creators | 删除文档标明不要的品牌 Logo 墙；申请条件区去图并重排；申请流程改为六步编号网格，手机纵向展示。 |
| Creators | 按最新要求将原 A WORLD OF POINTS OF VIEW 图墙替换为 SOME OF OUR CREATORS：复用首页的等高头像卡片与逐卡无缝轮播，使用黑色系背景、3px 白色系描边和白色标题，保留同款渐变按钮。移除平台、主题等筛选控件；每位博主补充表格中的一句话英文简介，模块标题下增加一句介绍。入场结束后立即滚动，保留按钮、拖动、触摸与悬停/聚焦暂停。 |
| About Us | Our Values 使用附件建筑图，取消柱子上的标记结构，五项价值观在图片下方清晰排列。 |
| Contact Us | 全站入口由 Let’s Talk 改为 Contact Us；移除页面大 Banner，直接显示询单表单；姓名拆为 First Name、Last Name，新增可选 Phone。前后端校验、邮件草稿与 Webhook 数据同步更新。 |

## 用户明确暂缓

- Case Studies 恢复旧版设计：本轮保留页面结构、内容、过滤交互和原有图片。为避免公共素材替换影响本页，原图已单独保存到 `public/images/case-formats`。

## 素材与实现说明

新增与替换的附件图已压缩为 WebP；`scripts/asset-manifest.json` 记录每项来源、尺寸和编码信息。附件没有视频或 GIF，因此首页使用指定静态图片制作轻微循环动效，并适配减少动态效果的系统设置。

首页博主头像根据 XLSX drawing 锚点与图片关系逐行匹配，压缩后存放于 `public/images/creators`；来源文件、表格行号与输出尺寸记录在素材清单中。粉丝量沿用提供表格的数值。

Creators 页复用相同的 11 位含头像博主，英文简介直接取自工作表 G 列；没有头像的 3 位继续不展示。首页卡片保持原有内容与米色主题。

首页主标题字体 `public/fonts/home-heading-black.ttf` 来自 Google Fonts 的 DM Sans 900，沿用 `public/fonts/OFL-DMSans.txt` 许可证，并由本站本地提供。

详细验证结果见 [verification.md](verification.md)。所有改动保存在当前工作区，尚未部署。

## 首页精修验证

已通过浏览器视口检查：1920×1080、1440×1000、1280×720、390×844、320×568、844×390。Hero 一屏展示，横屏下按钮与底部圆圈箭头不重叠，宽体主标题无溢出且两行字号相同；品牌保持单行原色无缝循环，副标题完整，已移除指定文字及播放按钮。悬停、键盘聚焦暂停和移开后恢复均已验证；减少动态效果时使用静态横向浏览。卡片继续支持逐卡滚动。

本轮 Lint、类型检查和生产构建均通过，另在生产模式下确认了 1440×1000 与 390×844 的标题字体、品牌区内容、样式及键盘交互。
