import client from "./client";

export async function getUserProfile(userId: string) {
  const query = `
  query getUserProfile ($userId:ID!){
    getBugCollectionByUser(userId:$userId){
      data{
        name
      }
    }
    getFishCollectionByUser(userId:$userId){
      data{
        name
      }
    }
    getFossilCollectionByUser(userId:$userId){
      data{
        name
      }
    }
    getArtCollectionByUser(userId:$userId){
      data{
        name
      }
    }
    getCustomDesignsByUser(userId:$userId, redacted: false){
      data{
          title
          s3Url
          code
      }
    }
    getSavedCustomDesignsByUser(userId:$userId){
      data{
        customDesign{
          title
          s3Url
          code
        }
      }
    }
  }
  `;
  const result = await client.request(query, { userId });
  return {
    bugs: result.getBugCollectionByUser.data,
    fish: result.getFishCollectionByUser.data,
    fossils: result.getFossilCollectionByUser.data,
    customDesigns: result.getCustomDesignsByUser.data,
    savedCustomDesigns: result.getSavedCustomDesignsByUser.data
  };
}
