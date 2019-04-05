import { assert } from 'chai';
import { getViewPath } from '../view';

suite("view.ts should", function () {

    test("get a view path", function () {
        const path = getViewPath('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Controllers\\HomeController.cs', 'Index');
        assert.equal(path, 'C:\\Users\\User\\Desktop\\Projects\\MyProject\\Views\\Home\\Index.cshtml');
    });

    test("get a view path for controllers nested inside an area folder", function () {
        const path = getViewPath('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Areas\\MyArea\\Controllers\\HomeController.cs', 'Index');
        assert.equal(path, 'C:\\Users\\User\\Desktop\\Projects\\MyProject\\Areas\\MyArea\\Views\\Home\\Index.cshtml');
    });
});