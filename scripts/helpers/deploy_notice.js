'use strict';

// 构建环境变量 deploy 命中 theme.comments.deploy_notice.env 中任一值（严格区分大小写），
// 且总开关 theme.comments.deploy_notice.enable 为 true 时，用自定义提示块替换原生评论区
// （用于国内无法访问评论服务的镜像站点）。
// 平台侧注入示例：ESA Pages / EdgeOne Pages 构建环境变量 deploy=cn 或 deploy=esa
hexo.extend.helper.register('deploy_notice', function () {
  const notice = hexo.theme.config.comments?.deploy_notice;
  const env = process.env.deploy;
  if (notice == null || notice.enable !== true) {
    return { active: false };
  }
  if (notice.env == null || env == null || env === '') {
    return { active: false };
  }
  const matched = (Array.isArray(notice.env) ? notice.env : String(notice.env).split(','))
    .map((item) => String(item).trim())
    .filter((item) => item.length > 0);
  if (!matched.includes(String(env).trim())) {
    return { active: false };
  }
  return {
    active: true,
    title: notice.title || '',
    content: notice.content || ''
  };
});
