import * as path from 'path';
import { ext } from './constants';
import { goTo } from './goTo';

export async function goToCodeBehind() {
    await goTo('code behind', getCodeBehindPath);
}

export async function goToBlazorComponent() {
    await goTo('component', getBlazorComponentPath);
}

function getBlazorComponentPath(codeBehindPath: string) {
    return path.join(path.dirname(codeBehindPath), path.basename(codeBehindPath, ext.razorCs) + ext.razor);
}

function getCodeBehindPath(componentPath: string) {
    return path.join(path.dirname(componentPath), path.basename(componentPath, ext.razor) + ext.razorCs);
}