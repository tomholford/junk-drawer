import Rule from "./rule.type";

type Ruleset = {
  name: string,
  description: string,
  sourceDirs: string[],
  rules: Rule[]
}

export default Ruleset;
