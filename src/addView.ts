import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { getCurrentLine, ext } from './shared';
import { getViewPath, isController } from './view';

export function addView() {
    if (!vscode.window.activeTextEditor) {
        return;
    }

    const line = getCurrentLine(vscode.window.activeTextEditor);
    const controllerPath = vscode.window.activeTextEditor.document.fileName;

    if (!isController(controllerPath)) {
        vscode.window.showWarningMessage("This doesn't look like a valid controller.");
        return;
    }

    const viewPath = getViewPath(controllerPath, line);
    if (!viewPath) {
        vscode.window.showErrorMessage('Unable to create a view.');
        return;
    }

    if (fs.existsSync(viewPath)) {
        vscode.window.showInformationMessage('View already exists.');
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