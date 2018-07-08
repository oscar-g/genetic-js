/**
 * Facilitates communcation between web workers
 */
export class Serialization {
    public static stringify(obj: any) {
        return JSON.stringify(obj, function (key, value) {
            if (value instanceof Function || typeof value == "function") {
                return "__func__:" + value.toString();
            }
            if (value instanceof RegExp) {
                return "__regex__:" + value;
            }
            return value;
        });
    }
    public static parse(str: string) {
        return JSON.parse(str, function (key, value) {
            if (typeof value != "string") {
                return value;
            }
            if (value.lastIndexOf("__func__:", 0) === 0) {
                return eval("(" + value.slice(9) + ")");
            }
            if (value.lastIndexOf("__regex__:", 0) === 0) {
                return eval("(" + value.slice(10) + ")");
            }
            return value;
        });
    }
}
