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
    const dir = path.dirname(viewPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(viewPath, getTemplate(path.basename(viewPath, ext.cshtml)));
}

function getTemplate(title: string) {
    return '@{' + os.EOL +
        `    ViewData["Title"] = "${title}";` + os.EOL +
        '}';
}