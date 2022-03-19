interface FreeImgReq {
  width: number;
  height: number;
}
export function getFreeImg(params: FreeImgReq) {
  const { width, height } = params;
  return `https://picsum.photos/${width}/${height}`;
}
