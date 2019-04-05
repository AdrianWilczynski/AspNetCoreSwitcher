import { assert } from 'chai';
import { getControllerPath, isView } from '../goToController';

suite("goToController Should", function () {

    test("get controller path", function () {
        const path = getControllerPath('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Views\\Home\\Index.cshtml');
        assert.equal(path, 'C:\\Users\\User\\Desktop\\Projects\\MyProject\\Controllers\\HomeController.cs');
    });

    test("recognize valid view", function () {
        assert.isTrue(isView('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Views\\Home\\Index.cshtml'));
    });

    test("recognize invalid view", function () {
        assert.isFalse(isView('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Views\\_Layout.cshtml'));
        assert.isFalse(isView('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Templates\\Home\\Index.cshtml'));
        assert.isFalse(isView('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Templates\\Home\\Home\\Index.cshtml'));
        assert.isFalse(isView('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Controllers\\HomeController.cs'));
        assert.isFalse(isView('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Pages\\Index.cshtml'));
    });
});