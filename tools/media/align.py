import cv2, numpy as np
names=['01-spring-daylight','02-summer-evening','03-autumn-daylight-fixed','04-autumn-rainy-evening','05-winter-daylight','06-winter-holiday-evening']
REF='06-winter-holiday-evening'
ref=cv2.imread(f'gen/{REF}.png')
sift=cv2.SIFT_create(8000)
def feats(im):
    g=cv2.createCLAHE(3,(8,8)).apply(cv2.cvtColor(im,cv2.COLOR_BGR2GRAY))
    return sift.detectAndCompute(g,None)
kr,dr=feats(ref); bf=cv2.BFMatcher(); H,W=ref.shape[:2]
outs={};masks=[]
for n in names:
    im=cv2.imread(f'gen/{n}.png')
    if n==REF: M=np.eye(3)
    else:
        k,d=feats(im)
        m=[a for a,b in bf.knnMatch(d,dr,k=2) if a.distance<0.72*b.distance]
        src=np.float32([k[x.queryIdx].pt for x in m]); dst=np.float32([kr[x.trainIdx].pt for x in m])
        M,inl=cv2.findHomography(src,dst,cv2.RANSAC,4.0); print(n,len(m),int(inl.sum()))
    outs[n]=cv2.warpPerspective(im,M,(W,H),flags=cv2.INTER_LANCZOS4)
    masks.append(cv2.warpPerspective(np.full((H,W),255,np.uint8),M,(W,H),flags=cv2.INTER_NEAREST))
ok=np.minimum.reduce(masks)==255
# shrink a 3:2 rect around the centre until every frame covers it
cx,cy=W/2,H/2
for s in np.arange(1.0,0.5,-0.005):
    w,h=W*s,H*s; x0,y0=int(cx-w/2)+1,int(cy-h/2)+1; x1,y1=int(cx+w/2)-1,int(cy+h/2)-1
    if ok[y0:y1,x0:x1].all(): break
print('crop',s,x0,y0,x1,y1)
for i,n in enumerate(names):
    cv2.imwrite(f'align/{i+1:02d}.png',outs[n][y0:y1,x0:x1])
