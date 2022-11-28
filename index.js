import { Transformer } from "@parcel/plugin";
import simpleGit from "simple-git";

export default new Transformer({
  async transform({ asset }) {
    simpleGit().log({
      maxCount: 1
    });
    const source = await asset.getCode();
    
    asset.setCode(
      source.replace(/GIT_COMMIT_HASH_SHORT/g, '000')
    );

    return [asset];
  }
});
