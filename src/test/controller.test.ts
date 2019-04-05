import * as assert from 'assert';
import { getControllerPath } from '../goToController';

suite("goToController Should", function () {

    test("get controller path", function () {
        const path = getControllerPath('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Views\\Home\\Index.cshtml');
        assert.equal(path, 'C:\\Users\\User\\Desktop\\Projects\\MyProject\\Controllers\\HomeController.cs');
    });
});