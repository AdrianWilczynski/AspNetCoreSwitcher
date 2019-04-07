import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ext, messages } from './shared';
import { getViewPath, isController, getClosestActionName } from './view';

export function addView() {
    if (!vscode.window.activeTextEditor) {
        return;
    }

    const path = vscode.window.activeTextEditor.document.fileName;

    if (!isController(path)) {
        vscode.window.showWarningMessage(messages.notValid('controller'));
        return;
    }

    const actionName = getClosestActionName(vscode.window.activeTextEditor);
    if (!actionName) {
        vscode.window.showWarningMessage(messages.unableToFindAction);
        return;
    }

    const viewPath = getViewPath(path, actionName);

    if (fs.existsSync(viewPath)) {
        vscode.window.showWarningMessage(messages.viewAlreadyExists);
        return;
    }

    createView(viewPath);
}

function createView(viewPath: string) {
    createDirectory(viewPath);
    fs.writeFileSync(viewPath, getTemplate(path.basename(viewPath, ext.cshtml)));
}

function createDirectory(viewPath: string) {
    const parsedPath = path.parse(viewPath);

    const dirPath = parsedPath.dir;
    const root = parsedPath.root;

    let partialDirPath = root;
    for (const dir of dirPath.split(path.sep).splice(1)) {
        partialDirPath = path.join(partialDirPath, dir);

        if (!fs.existsSync(partialDirPath)) {
            fs.mkdirSync(partialDirPath);
        }
    }
}

function getTemplate(title: string) {
    return '@{' + os.EOL +
        `    ViewData["Title"] = "${title}";` + os.EOL +
        '}';
}