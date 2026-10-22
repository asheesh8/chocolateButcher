import glob, numpy as np
from PIL import Image
A='art/'; O='cb/public/img/art/'
def f(k): return glob.glob(A+f'*{k}*')[0]
def crop(im,x0,y0,x1,y1):
    W,H=im.size; return im.crop((int(W*x0),int(H*y0),int(W*x1),int(H*y1)))
def ink(im, lo=70, hi=175):
    """Line art only: alpha from darkness, so paper and watercolour wash drop out."""
    a=np.asarray(im.convert('RGB')).astype(float)
    L=a@[.299,.587,.114]
    alpha=np.clip((hi-L)/(hi-lo),0,1)
    out=np.dstack([np.full(L.shape,42),np.full(L.shape,26),np.full(L.shape,20),(alpha*255)]).astype(np.uint8)
    return Image.fromarray(out,'RGBA')
def save(im,name,w):
    if im.width>w: im=im.resize((w,int(im.height*w/im.width)),Image.LANCZOS)
    im.save(O+name+'.webp',quality=82,method=6); print(name,im.size)
# dividers (ink only)
save(ink(crop(Image.open(f('07_')),.03,0,.99,1)),'div-cleaver',900)
save(ink(crop(Image.open(f('08_')),0,.25,.87,1)),'div-mountains',800)
save(ink(crop(Image.open(f('09_')),0,.2,1,1)),'div-pines',800)
save(ink(crop(Image.open(f('10_')),0,.2,.93,1)),'div-botanical',800)
# sketch accents (ink only)
save(ink(Image.open(f('06_')),60,190),'sketch-cocoa',700)
save(ink(crop(Image.open(f('11_')),0,0,.7,1),60,190),'sketch-chunks',700)
save(ink(crop(Image.open(f('15_')),0,0,.37,1),60,200),'sketch-pod',500)
# watercolour scenes (kept whole, trimmed of collage strays)
save(crop(Image.open(f('01_')).convert('RGB'),.02,0,.99,1),'wc-waterfront',1600)
save(crop(Image.open(f('02_')).convert('RGB'),0,.05,1,.95),'wc-panorama',1800)
save(crop(Image.open(f('03_')).convert('RGB'),0,.28,1,.9),'wc-green-mountains',1400)
save(Image.open(f('04_')).convert('RGB'),'wc-forest',1300)
save(Image.open(f('05_')).convert('RGB'),'wc-church-street',900)
save(crop(Image.open(f('12_')).convert('RGB'),.07,0,1,.92),'wc-sunset',1400)
save(Image.open(f('13_')).convert('RGB'),'wc-church-sketch',1000)
save(crop(Image.open(f('14_')).convert('RGB'),.02,0,.8,1),'wc-sailboat',1400)
import cv2
B='art2/'
def g(k): return glob.glob(B+f'*{k}*')[0]
# re-cut accents that still carried collage fragments
save(ink(crop(Image.open(f('11_')),0,0,.6,1),60,190),'sketch-chunks',700)
save(ink(crop(Image.open(f('15_')),0,0,.3,1),60,200),'sketch-pod',500)
save(ink(crop(Image.open(g('16_')),0,.08,1,1),60,190),'sketch-roughcut',700)
# Vermont map: drop the stars and the misplaced label, keep the outline; the pin is drawn in CSS
m=cv2.imread(g('17_'))
mask=np.zeros(m.shape[:2],np.uint8)
for (x,y) in [(97,139),(72,159)]: cv2.circle(mask,(x,y),9,255,-1)
mask[128:170,122:260]=255; mask[176:207,30:54]=255
m=cv2.inpaint(m,mask,5,cv2.INPAINT_TELEA)
mp=Image.fromarray(cv2.cvtColor(m,cv2.COLOR_BGR2RGB)).crop((45,48,160,207))
mp=mp.resize((mp.width*3,mp.height*3),Image.LANCZOS)
save(ink(mp,95,185),'sketch-vermont',345)
# pre-faded scene backgrounds
save(crop(Image.open(g('18_')).convert('RGB'),.03,0,.98,1),'wc-waterfront-faded',1600)
save(Image.open(g('19_')).convert('RGB'),'wc-church-faded',900)
save(crop(Image.open(g('20_')).convert('RGB'),0,.05,1,.95),'wc-mountains-faded',1800)
v=Image.open(O+'sketch-vermont.webp').convert('RGBA'); a=np.array(v)
a[400:,0:33,3]=0; a[420:463,44:115,3]=0; a[463:,0:33,3]=0
Image.fromarray(a).save(O+'sketch-vermont.webp',quality=82,method=6)
