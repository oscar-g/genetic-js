// tslint:disable:no-empty
import { asyncLooper } from "../src/asyncLooper";

describe("asyncLooper", () => {
  describe("sync doStuff", () => {
    it("should respect shouldContinue argument", async () => {
      expect.assertions(1);
      let lastIteration = 0;
      function shouldContinue(currIteration: number) {
        lastIteration = currIteration;
        return currIteration < 10;
      }
      function doStuff(currIteration: number, breakFn: Function) {}
      await asyncLooper(shouldContinue, doStuff);
      expect(lastIteration).toBe(10);
    });
    it("should respect calling breakFn parameter", async () => {
      expect.assertions(1);
      let lastIteration = 0;
      function shouldContinue(currIteration: number) {
        return true;
      }
      function doStuff(currIteration: number, breakFn: Function) {
        lastIteration = currIteration;
        if (currIteration === 10) {
          breakFn();
        }
      }
      await asyncLooper(shouldContinue, doStuff);
      await expect(lastIteration).toBe(10);
    });
  });
  describe("async doStuff", () => {
    it("should respect shouldContinue argument", async () => {
      expect.assertions(1);
      let lastIteration = 0;
      function shouldContinue(currIteration: number) {
        lastIteration = currIteration;
        return currIteration < 10;
      }
      function doStuff(currIteration: number, breakFn: Function) {
        return new Promise<void>(resolve => {
          setTimeout(() => {
            resolve();
          }, 1);
        });
      }
      await asyncLooper(shouldContinue, doStuff);
      expect(lastIteration).toBe(10);
    });
    it("should respect calling breakFn parameter", async () => {
      expect.assertions(1);
      let lastIteration = 0;
      function shouldContinue(currIteration: number) {
        return true;
      }
      function doStuff(currIteration: number, breakFn: Function) {
        lastIteration = currIteration;
        return new Promise<void>(resolve => {
          setTimeout(() => {
            if (currIteration === 10) {
              breakFn();
            }
            resolve();
          }, 1);
        });
      }
      await asyncLooper(shouldContinue, doStuff);
      expect(lastIteration).toBe(10);
    });
  });

  describe("error handling", () => {
    describe("sync", () => {
      it("should handle errors thrown from shouldContinue argument", async () => {
        expect.assertions(2);
        const catchError = new Error("shouldContinue is broken!");
        function shouldContinue(currIteration: number): boolean {
          throw catchError;
        }
        function doStuff(currIteration: number, breakFn: Function) {}
        const thenCb = jest.fn();
        const catchCb = jest.fn();
        await asyncLooper(shouldContinue, doStuff)
          .then(thenCb)
          .catch(catchCb);
        expect(thenCb).not.toBeCalled();
        expect(catchCb).toBeCalledWith(catchError);
      });
      it("should handle errors thrown from doStuff argument", async () => {
        expect.assertions(2);
        function shouldContinue(currIteration: number) {
          return false;
        }
        const catchError = new Error("doStuff is broken!");
        function doStuff(currIteration: number, breakFn: Function) {
          throw catchError;
        }
        const thenCb = jest.fn();
        const catchCb = jest.fn();
        await asyncLooper(shouldContinue, doStuff)
          .then(thenCb)
          .catch(catchCb);
        expect(thenCb).not.toBeCalled();
        expect(catchCb).toBeCalledWith(catchError);
      });
    });
    describe("async", () => {
      it("should handle errors thrown from doStuff argument", async () => {
        expect.assertions(2);
        function shouldContinue(currIteration: number) {
          return false;
        }
        const catchError = new Error("doStuff is broken!");
        function doStuff(currIteration: number, breakFn: Function) {
          return Promise.reject(catchError);
        }
        const thenCb = jest.fn();
        const catchCb = jest.fn();
        await asyncLooper(shouldContinue, doStuff)
          .then(thenCb)
          .catch(catchCb);
        expect(thenCb).not.toBeCalled();
        expect(catchCb).toBeCalledWith(catchError);
      });
    });
  });
});
