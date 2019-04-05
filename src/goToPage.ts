import * as vscode from 'vscode';
import * as path from 'path';
import { goTo, dirs, ext } from './shared';

export async function goToPage() {
    if (!vscode.window.activeTextEditor) {
        return;
    }

    const path = vscode.window.activeTextEditor.document.fileName;

    if (!isLocationValid(path) && !isPageModel(path)) {
        return;
    }

    await goTo(getPagePath(path), 'Unable to find a matching page.');
}

export async function goToPageModel() {
    if (!vscode.window.activeTextEditor) {
        return;
    }

    const path = vscode.window.activeTextEditor.document.fileName;
    const text = vscode.window.activeTextEditor.document.getText();

    if (!isLocationValid(path) && !isPage(path, text)) {
        return;
    }

    await goTo(getPageModelPath(vscode.window.activeTextEditor.document.fileName), 'Unable to find a matching page model.');
}

function getPagePath(pageModelPath: string) {
    return path.join(path.dirname(pageModelPath), path.basename(pageModelPath, ext.cshtmlCs) + ext.cshtml);
}

function getPageModelPath(pagePath: string) {
    return path.join(path.dirname(pagePath), path.basename(pagePath, ext.cshtml) + ext.cshtmlCs);
}

function isLocationValid(pageModelPath: string) {
    return pageModelPath.split(path.sep).includes(dirs.pages);
}

function isPageModel(pageModelPath: string) {
    return pageModelPath.endsWith(ext.cshtmlCs);
}

function isPage(pagePath: string, pageText: string) {
    return pagePath.endsWith(ext.cshtml) && pageText.includes('@page');
}