import * as assert from "assert";
import * as api from "../../api";
import { ICell } from "../../data-types";
import * as testUtils from "../testUtils";

describe("Routerlicious", () => {
    describe("Api", () => {
        describe("cell", () => {
            let testDocument: api.Document;
            let testCell: ICell;

            beforeEach(async () => {
                testUtils.registerAsTest("", "", "");
                testDocument = await api.load("testDocument");
                testCell = testDocument.createCell();
            });

            it("Can create a cell", () => {
                assert.ok(testCell);
            });

            it("Can set and get cell data", async () => {
                await testCell.set("testValue");
                assert.equal(await testCell.get(), "testValue");
            });

        });
    });
});
