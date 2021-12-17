import Ruleset from "../types/ruleset.type";

const moveAllTo: Rule = {
  patterns: ['*'],
  actions: [
    () => {}
  ]
}

const defaultRuleset: Ruleset = {
  name: 'Default Ruleset',
  description: 'Cleans up your desktop by stashing everything in ~/.junk-drawer/',
  sourceDirs: ['~/Desktop'],
  rules: []
};

export default defaultRuleset;