import * as path from 'path';
import { ext, dirs, controllerSuffix } from './shared';

export function getViewPath(controllerPath: string, line: string) {
    if (!isLocationValid(controllerPath)) {
        return;
    }

    const actionName = getActionName(line);
    if (!actionName) {
        return;
    }

    return path.join(getViewsDir(controllerPath), getControllerName(controllerPath), actionName + ext.cshtml);
}

function getViewsDir(controllerPath: string) {
    return path.join(path.dirname(controllerPath), '..', dirs.views);
}

function getControllerName(controllerPath: string) {
    const fileBaseName = path.basename(controllerPath, ext.cs);
    return fileBaseName.endsWith(controllerSuffix)
        ? fileBaseName.substring(0, fileBaseName.length - controllerSuffix.length)
        : fileBaseName;
}

function getActionName(line: string) {
    const matches = line.match(/(\w+)[ \t]*\(.*$/);
    if (!matches) {
        return;
    }

    return matches[1];
}

function isLocationValid(controllerPath: string) {
    return path.dirname(controllerPath).split(path.sep).pop() === dirs.controllers;
}