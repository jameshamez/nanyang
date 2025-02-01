import { parse } from "cookie";

export default function handler(req, res) {
    const cookies = parse(req.headers.cookie || "");
    const userData = cookies.userData ? JSON.parse(cookies.userData) : null;

    if (!userData) {
        return res.status(404).json({ message: "User data not found in cookies" });
    }

    res.status(200).json(userData);
}
