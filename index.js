import { Transformer } from "@parcel/plugin";
import simpleGit from "simple-git";

export default new Transformer({
  async transform({ asset }) {
    const git = simpleGit();
    const log = await git.log({maxCount: 1});
    const hash = log.latest.hash.slice(0, 7);

    const source = await asset.getCode();
    
    asset.setCode(
      source.replace(/GIT_COMMIT_HASH_SHORT/g, hash)
    );

    return [asset];
  }
});
