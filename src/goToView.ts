import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { goTo, ext, dirs, controllerSuffix } from './shared';

export async function goToView() {
    if (!vscode.window.activeTextEditor) {
        return;
    }

    const line = getCurrentLine(vscode.window.activeTextEditor);
    const path = vscode.window.activeTextEditor.document.fileName;

    const viewPath = getViewPath(path, line);
    if (!viewPath || !fs.existsSync(viewPath)) {
        return;
    }

    await goTo(viewPath);
}

function getCurrentLine(editor: vscode.TextEditor) {
    return editor.document.lineAt(editor.selection.start.line).text;
}

function getViewPath(controllerPath: string, line: string) {
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