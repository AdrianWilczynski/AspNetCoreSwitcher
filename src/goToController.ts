import * as path from 'path';
import { controllerSuffix, ext, dirs } from './constants';
import { goTo } from './goTo';

export async function goToController() {
    await goTo('controller', getControllerPath);
}

export function getControllerPath(viewPath: string) {
    const parentDir = getParentDir(viewPath);
    if (!parentDir) {
        return;
    }

    return path.join(getControllersDir(viewPath), parentDir + controllerSuffix + ext.cs);
}

function getParentDir(filePath: string) {
    return path.dirname(filePath).split(path.sep).pop();
}

function getControllersDir(viewPath: string) {
    return path.join(path.dirname(viewPath), '..', '..', dirs.controllers);
}

export function isView(viewPath: string) {
    return viewPath.endsWith(ext.cshtml) && isLocatedInViewsDir(viewPath);
}

function isLocatedInViewsDir(viewPath: string) {
    const pathSegments = path.dirname(viewPath).split(path.sep);

    if (pathSegments.length < 2) {
        return false;
    }

    return pathSegments[pathSegments.length - 2] === dirs.views;
}