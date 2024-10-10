import agent from "superagent"
import prefix from "superagent-prefix"

const baseURL = "http://localhost:4000/"
const superagent = agent.agent().use(prefix(baseURL))

describe("/User/login", () => {
    it("GET login response 200", async () => {
        const res = await superagent.get("/user/login")
        expect(res.status).toBe(200)
    })
})