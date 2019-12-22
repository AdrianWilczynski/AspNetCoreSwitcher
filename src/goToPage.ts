import * as path from 'path';
import { dirs, ext } from './constants';
import { goTo } from './goTo';

export async function goToPage() {
    await goTo('page', getPagePath);
}

export async function goToPageModel() {
    await goTo('page model', getPageModelPath);
}

export function getPagePath(pageModelPath: string) {
    return path.join(path.dirname(pageModelPath), path.basename(pageModelPath, ext.cshtmlCs) + ext.cshtml);
}

export function getPageModelPath(pagePath: string) {
    return path.join(path.dirname(pagePath), path.basename(pagePath, ext.cshtml) + ext.cshtmlCs);
}

export function isPageModel(pageModelPath: string) {
    return pageModelPath.endsWith(ext.cshtmlCs) && isLocatedInPagesDir(pageModelPath);
}

export function isPage(pagePath: string) {
    return pagePath.endsWith(ext.cshtml) && isLocatedInPagesDir(pagePath);
}

function isLocatedInPagesDir(pagePath: string) {
    return pagePath.split(path.sep).includes(dirs.pages);
}