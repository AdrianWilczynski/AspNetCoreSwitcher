import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { getCurrentLine, ext, messages } from './shared';
import { getViewPath, isController, getActionName } from './view';

export function addView() {
    if (!vscode.window.activeTextEditor) {
        return;
    }

    const line = getCurrentLine(vscode.window.activeTextEditor);
    const path = vscode.window.activeTextEditor.document.fileName;

    if (!isController(path)) {
        vscode.window.showWarningMessage(messages.notValid('controller'));
        return;
    }

    const actionName = getActionName(line);
    if (!actionName) {
        vscode.window.showWarningMessage(messages.notMethodDeclaration);
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