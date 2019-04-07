import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { controllerSuffix, ext, dirs, messages } from './shared';

export async function goToController() {
    if (!vscode.window.activeTextEditor) {
        return;
    }

    const path = vscode.window.activeTextEditor.document.fileName;

    if (!isView(path)) {
        vscode.window.showWarningMessage(messages.notValid('view'));
        return;
    }

    const controllerPath = getControllerPath(path);
    if (!controllerPath) {
        vscode.window.showWarningMessage(messages.notValid('view'));
        return;
    }

    if (!fs.existsSync(controllerPath)) {
        vscode.window.showWarningMessage(messages.unableToFind('controller'));
        return;
    }

    const document = await vscode.workspace.openTextDocument(controllerPath);
    await vscode.window.showTextDocument(document);
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