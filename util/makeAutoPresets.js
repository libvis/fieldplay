const fs = require('fs');

const presets = [
  { name: 'Secret door', params: `dt=0.01&fo=0.998&dp=0.009&cm=1&cx=-0.15344999999999986&cy=-0.1291&w=7.4611&h=7.4611&vf=%2F%2F%20p.x%20and%20p.y%20are%20current%20coordinates%0A%2F%2F%20v.x%20and%20v.y%20is%20a%20velocity%20at%20point%20p%0Avec2%20get_velocity%28vec2%20p%29%20%7B%0A%20%20vec2%20v%20%3D%20vec2%280.%2C%200.%29%3B%0A%0A%20%20%2F%2F%20change%20this%20to%20get%20a%20new%20vector%20field%0A%20%20v.x%20%3D%20p.y*p.y%20*%200.5%3B%0A%20%20v.y%20%3D%20-p.x*p.x%20*.05%3B%0A%0A%20%20return%20v%3B%0A%7D&code=%2F%2F%20p.x%20and%20p.y%20are%20current%20coordinates%0A%2F%2F%20v.x%20and%20v.y%20is%20a%20velocity%20at%20point%20p%0Avec2%20get_velocity%28vec2%20p%29%20%7B%0A%20%20vec2%20v%20%3D%20vec2%280.%2C%200.%29%3B%0A%0A%20%20%2F%2F%20change%20this%20to%20get%20a%20new%20vector%20field%0A%20%20v.x%20%3D%20p.y*p.y%20%3B%0A%20%20v.y%20%3D%20-p.x*p.x%20*.05%3B%0A%0A%20%20return%20v%3B%0A%7D` },

  { name: 'Miserables graph with edges', params: `dt=-0.001&fo=0.998&dp=0.008&cm=2&cx=0.467&cy=1.5294&w=0.9368&h=0.9368&showBindings=1&i0=https%3A%2F%2Fgist.githubusercontent.com%2Fanvaka%2Febc18e3ffe05b0709a7ae933261fa2e9%2Fraw%2Fbafb63d01e0ab37c1f9b51522a5ec4fbc19bc4f1%2Fedges.png&vf=%2F%2F%20p.x%20and%20p.y%20are%20current%20coordinates%0A%2F%2F%20v.x%20and%20v.y%20is%20a%20velocity%20at%20point%20p%0Avec2%20get_velocity%28vec2%20p%29%20%7B%0A%20%20vec2%20v%20%3D%20vec2%280.%2C%200.%29%3B%0A%0A%20%20%2F%2F%20change%20this%20to%20get%20a%20new%20vector%20field%0A%20%20vec4%20c%20%3D%20texture2D%28input0%2C%20vec2%28mod%28p.x%2C1.%29%2C%201.%20-%20mod%28p.y%2C%201.%29%29%29%3B%0A%20%20v.x%20%3D%20%28c.r%20%2B%20c.g%2F255.%29%20-%200.5%3B%0A%20%20v.y%20%3D%200.5%20-%20%28c.b%20%2B%20c.a%2F255.%29%3B%0A%0A%20%20return%20%28v%29%3B%0A%7D&code=%2F%2F%20p.x%20and%20p.y%20are%20current%20coordinates%0A%2F%2F%20v.x%20and%20v.y%20is%20a%20velocity%20at%20point%20p%0Avec2%20get_velocity%28vec2%20p%29%20%7B%0A%20%20vec2%20v%20%3D%20vec2%280.%2C%200.%29%3B%0A%0A%20%20%2F%2F%20change%20this%20to%20get%20a%20new%20vector%20field%0A%20%20vec4%20c%20%3D%20texture2D%28input0%2C%20vec2%28mod%28p.x%2C1.%29%2C%201.%20-%20mod%28p.y%2C%201.%29%29%29%3B%0A%20%20v.x%20%3D%20%28c.r%20%2B%20c.g%2F255.%29%20-%200.5%3B%0A%20%20v.y%20%3D%200.5%20-%20%28c.b%20%2B%20c.a%2F255.%29%3B%0A%0A%20%20if%20%28length%28v%29%20%3C%200.1%29%20v%20%3D%20vec2%280.%29%3B%0A%20%20return%20%28v%29%3B%0A%7D&pc=40000` },

  { name: 'Roads', params: `dt=0.001&fo=0.998&dp=0.009&cm=2&cx=0.478&cy=0.2636&w=0.9922&h=0.9922&showBindings=0&i0=https%3A%2F%2Fgist.githubusercontent.com%2Fanvaka%2Febc18e3ffe05b0709a7ae933261fa2e9%2Fraw%2Fcd7d82c5a235f50f5655ac94aa9077709731adde%2Fbinary_tree.png&vf=%2F%2F%20p.x%20and%20p.y%20are%20current%20coordinates%0A%2F%2F%20v.x%20and%20v.y%20is%20a%20velocity%20at%20point%20p%0Avec2%20get_velocity%28vec2%20p%29%20%7B%0A%20%20vec2%20v%20%3D%20vec2%280.%2C%200.%29%3B%0A%0A%20%20%2F%2F%20change%20this%20to%20get%20a%20new%20vector%20field%0A%20%20vec4%20c%20%3D%20texture2D%28input0%2C%20vec2%28mod%28p.x%2C1.%29%2C%201.%20-%20mod%28p.y%2C%201.%29%29%29%3B%0A%20%20v.x%20%3D%20%28c.r%20%2B%20c.g%2F255.%29%20-%200.5%3B%0A%20%20v.y%20%3D%200.5%20-%20%28c.b%20%2B%20c.a%2F255.%29%3B%0A%0A%20%20return%20%28v%29%3B%0A%7D&code=%2F%2F%20p.x%20and%20p.y%20are%20current%20coordinates%0A%2F%2F%20v.x%20and%20v.y%20is%20a%20velocity%20at%20point%20p%0Avec2%20get_velocity%28vec2%20p%29%20%7B%0A%20%20vec2%20v%20%3D%20vec2%280.%2C%200.%29%3B%0A%0A%20%20%2F%2F%20change%20this%20to%20get%20a%20new%20vector%20field%0A%20%20vec4%20c%20%3D%20texture2D%28input0%2C%20vec2%28mod%28p.x%2C1.%29%2C%201.%20-%20mod%28p.y%2C%201.%29%29%29%3B%0A%20%20v.x%20%3D%20%28c.r%20%2B%20c.g%2F255.%29%20-%200.5%3B%0A%20%20v.y%20%3D%200.5%20-%20%28c.b%20%2B%20c.a%2F255.%29%3B%0A%0A%20%20return%20%28v%29%3B%0A%7D&pc=40000` },

  { name: 'Four counterclockwise cogs pushing particles clockwise :)', params: `dt=0.01&fo=0.998&dp=0.009&cm=1&cx=0.7887499999999994&cy=-0.5769500000000001&w=16.3759&h=16.3759&vf=vec2%20field%28vec2%20p%29%20%7B%0A%20%20float%20d%20%3D%20length%28p%29%3B%0A%20%20return%20vec2%28-p.y%2C%20p.x%29%20*%20exp%28-d*d*0.4%29%3B%0A%7D%0A%2F%2F%20p.x%20and%20p.y%20are%20current%20coordinates%0A%2F%2F%20v.x%20and%20v.y%20is%20a%20velocity%20at%20point%20p%0Avec2%20get_velocity%28vec2%20p%29%20%7B%0A%20%20vec2%20v%20%3D%20vec2%280.%2C%200.%29%3B%0A%0A%20%20%2F%2F%20change%20this%20to%20get%20a%20new%20vector%20field%0A%20%20v%20%3D%20field%28p%20%2B%20vec2%28-5.%2C%200.%29%29%20%2B%20%0A%20%20%20%20field%28p%20%2B%20vec2%28-2.5%2C%202.5%29%29%20%2B%0A%20%20%20%20field%28p%20%2B%20vec2%280.%2C%200.%29%29%20%2B%20%0A%20%20%20%20field%28p%20%2B%20vec2%28-2.5%2C%20-2.5%29%29%3B%0A%20%20return%20v%3B%0A%7D&code=vec2%20field%28vec2%20p%29%20%7B%0A%20%20float%20d%20%3D%20length%28p%29%3B%0A%20%20return%20vec2%28-p.y%2C%20p.x%29%20*%20exp%28-d*d*0.1%29%3B%0A%7D%0A%2F%2F%20p.x%20and%20p.y%20are%20current%20coordinates%0A%2F%2F%20v.x%20and%20v.y%20is%20a%20velocity%20at%20point%20p%0Avec2%20get_velocity%28vec2%20p%29%20%7B%0A%20%20vec2%20v%20%3D%20vec2%280.%2C%200.%29%3B%0A%0A%20%20%2F%2F%20change%20this%20to%20get%20a%20new%20vector%20field%0A%20%20v%20%3D%20field%28p%20%2B%20vec2%28-5.%2C%200.%29%29%20%2B%20%0A%20%20%20%20field%28p%20%2B%20vec2%28-2.5%2C%202.5%29%29%20%2B%0A%20%20%20%20field%28p%20%2B%20vec2%280.%2C%200.%29%29%20%2B%20%0A%20%20%20%20field%28p%20%2B%20vec2%28-2.5%2C%20-2.5%29%29%3B%0A%20%20return%20v%3B%0A%7D` },

  { name: 'Waveshaping [interactive]', params: `cx=0&cy=-0.060899999999999954&w=12&h=12&dt=0.01&fo=0.998&dp=0.009&cm=2&vf=float%20f%28float%20x%29%20%7B%0A%20%20bool%20supportsHover%20%3D%20length%28cursor.zw%29%20%3E%200.01%3B%0A%20%20vec2%20c%20%3D%20supportsHover%20%3F%20cursor.zw%20%3A%20cursor.xy%3B%0A%20%20float%20f1%20%3D%20sin%28x%29%3B%0A%20%20float%20f2%20%3D%20sin%282.*x%29%3B%0A%20%20float%20f3%20%3D%20sin%283.*x%29%3B%0A%20%20float%20f4%20%3D%20sin%284.*x%29%3B%0A%20%20float%20f5%20%3D%20sin%285.*x%29%3B%0A%20%20return%20f1%20%2B%20%0A%20%20%20%20f2*c.x%2F4.%20%2B%20%0A%20%20%20%20f3*c.y%2F6.%20%2B%0A%20%20%20%20f4*c.x%2F8.%20%2B%0A%20%20%20%20f5*c.y%2F10.%3B%0A%7D%0A%0Afloat%20df%28float%20x%29%20%7B%0A%20%20float%20h%20%3D%200.001%3B%0A%20%20return%20%28f%28x%2Bh%29-f%28x-h%29%29%2F%282.*h%29%3B%0A%7D%0A%0A%0Avec2%20get_velocity%28vec2%20p%29%20%7B%0A%20%20vec2%20v%20%3D%20vec2%280.%2C%200.%29%3B%0A%0A%20%20float%20fx%20%3D%20f%28p.x%29%3B%0A%20%20float%20d%20%3D%20abs%28p.y-fx%29%3B%0A%20%20float%20dfx%20%3D%20df%28p.x%29%3B%0A%20%20vec2%20toOrigin%20%3D%20-p%2F%2820.*length%28p%29%29%3B%0A%20%20vec2%20toF%20%3D%200.1*vec2%280.%2Cfx-p.y%29%3B%0A%20%20v%20%3D%20d%20%3C%200.1%20%3F%20vec2%281.%2Cdfx%29%20%3A%20toF%3B%0A%20%20return%20v%3B%0A%7D&code=float%20f%28float%20x%29%20%7B%0A%20%20bool%20supportsHover%20%3D%20length%28cursor.zw%29%20%3E%200.01%3B%0A%20%20vec2%20c%20%3D%20supportsHover%20%3F%20cursor.zw%20%3A%20cursor.xy%3B%0A%20%20float%20f1%20%3D%20sin%28x%29%3B%0A%20%20float%20f2%20%3D%20sin%282.*x%29%3B%0A%20%20float%20f3%20%3D%20sin%283.*x%29%3B%0A%20%20float%20f4%20%3D%20sin%284.*x%29%3B%0A%20%20float%20f5%20%3D%20sin%285.*x%29%3B%0A%20%20return%20f1%20%2B%20%0A%20%20%20%20f2*c.x%2F4.%20%2B%20%0A%20%20%20%20f3*c.y%2F6.%20%2B%0A%20%20%20%20f4*c.x%2F8.%20%2B%0A%20%20%20%20f5*c.y%2F10.%3B%0A%7D%0A%0Afloat%20df%28float%20x%29%20%7B%0A%20%20float%20h%20%3D%200.001%3B%0A%20%20return%20%28f%28x%2Bh%29-f%28x-h%29%29%2F%282.*h%29%3B%0A%7D%0A%0A%0Avec2%20get_velocity%28vec2%20p%29%20%7B%0A%20%20vec2%20v%20%3D%20vec2%280.%2C%200.%29%3B%0A%0A%20%20float%20fx%20%3D%20f%28p.x%29%3B%0A%20%20float%20d%20%3D%20abs%28p.y-fx%29%3B%0A%20%20float%20dfx%20%3D%20df%28p.x%29%3B%0A%20%20vec2%20toOrigin%20%3D%20-p%2F%2820.*length%28p%29%29%3B%0A%20%20vec2%20toF%20%3D%200.1*vec2%280.%2Cfx-p.y%29%3B%0A%20%20v%20%3D%20d%20%3C%200.1%20%3F%20vec2%281.%2Cdfx%29%20%3A%20toF%3B%0A%20%20return%20v%3B%0A%7D&pc=50000` },

  { name: 'Hex plane [interactive]', params: `dt=0.01&fo=0.99&dp=0.99&cm=3&cx=0&cy=0&w=8.5398&h=8.5398&vf=vec2%20nearest%28vec2%20p%29%20%7B%0A%20%20%2F%2F%20Charles%20Chambers%20black%20hex%20magic%0Afloat%20temp%20%3D%20floor%28p.x%20%2B%20sqrt%283.%29%20*%20p.y%20%2B%201.%29%3B%0Afloat%20q%20%3D%20floor%28%28floor%282.*p.x%2B1.%29%20%2B%20temp%29%20%2F%203.%29%3B%0Afloat%20r%20%3D%20floor%28%28temp%20%2B%20floor%28-p.x%20%2B%20sqrt%283.%29%20*%20p.y%20%2B%201.%29%29%2F3.%29%3B%0Areturn%20vec2%28q-p.y%2F2.%2Cr-p.y%2F8.%29%3B%0A%7D%0A%0A%2F%2F%20p.x%20and%20p.y%20are%20current%20coordinates%0A%2F%2F%20v.x%20and%20v.y%20is%20a%20velocity%20at%20point%20p%0Avec2%20get_velocity%28vec2%20p%29%20%7B%0A%20%20vec2%20v%20%3D%20vec2%280.%2C%200.%29%3B%0A%20%20float%20f%20%3D%20frame%2F1000.%3B%0A%20%20float%20z%20%3D%20%283.-p.y%29%2F%286.%2Bcursor.zw.y*2.%29%3B%0A%20%20float%20a%20%3D%20atan%28cursor.zw.x%2Ccursor.zw.y%29%3B%0A%20%20vec2%20r%20%3D%20vec2%28cos%28a%29*p.x%20-%20sin%28a%29*p.y%2Csin%28a%29*p.x%2Bcos%28a%29*p.y%29%3B%0A%20%20vec2%20t%20%3D%20vec2%28r.x%20%2F%20z%2C%20r.y%20%2F%20z%29%3B%0A%20%20vec2%20n%20%3D%20nearest%28t%29%3B%0A%20%20v.x%20%3D%20t.x-n.x%3B%0A%20%20v.y%20%3D%20t.y-n.y%3B%0A%20%20return%20v%3B%0A%7D&code=vec2%20nearest%28vec2%20p%29%20%7B%0A%20%20%2F%2F%20Charles%20Chambers%20black%20hex%20magic%0Afloat%20temp%20%3D%20floor%28p.x%20%2B%20sqrt%283.%29%20*%20p.y%20%2B%201.%29%3B%0Afloat%20q%20%3D%20floor%28%28floor%282.*p.x%2B1.%29%20%2B%20temp%29%20%2F%203.%29%3B%0Afloat%20r%20%3D%20floor%28%28temp%20%2B%20floor%28-p.x%20%2B%20sqrt%283.%29%20*%20p.y%20%2B%201.%29%29%2F3.%29%3B%0Areturn%20vec2%28q-p.y%2F2.%2Cr-p.y%2F8.%29%3B%0A%7D%0A%0A%2F%2F%20p.x%20and%20p.y%20are%20current%20coordinates%0A%2F%2F%20v.x%20and%20v.y%20is%20a%20velocity%20at%20point%20p%0Avec2%20get_velocity%28vec2%20p%29%20%7B%0A%20%20vec2%20v%20%3D%20vec2%280.%2C%200.%29%3B%0A%20%20float%20f%20%3D%20frame%2F1000.%3B%0A%20%20float%20z%20%3D%20%283.-p.y%29%2F%286.%2Bcursor.zw.y*2.%29%3B%0A%20%20float%20a%20%3D%20cursor.zw.x%3B%0A%20%20vec2%20r%20%3D%20vec2%28cos%28a%29*p.x%20-%20sin%28a%29*p.y%2Csin%28a%29*p.x%2Bcos%28a%29*p.y%29%3B%0A%20%20vec2%20t%20%3D%20vec2%28r.x%20%2F%20z%2C%20r.y%20%2F%20z%29%3B%0A%20%20vec2%20n%20%3D%20nearest%28t%29%3B%0A%20%20v.x%20%3D%20t.x-n.x%3B%0A%20%20v.y%20%3D%20t.y-n.y%3B%0A%20%20return%20v%3B%0A%7D&pc=500000` },

  { name: 'Rain', params: `dt=0.01&fo=0.998&dp=0.009&cm=1&cx=0&cy=0&w=8.5398&h=8.5398&vf=bool%20isUnshadowed%28vec2%20p%29%20%7B%0A%20%20bool%20upper%20%3D%20length%28p%29%20%3E%201.0%20%26%26%20p.y%20%3E%200.0%3B%0A%20%20bool%20lower%20%3D%20length%28p%29%20%3E%201.0%20%26%26%20p.y%20%3C%200.0%20%26%26%20abs%28p.x%29%20%3E%201.0%3B%20%0A%20%20return%20upper%20%7C%7C%20lower%3B%0A%7D%0A%0Avec2%20unshadowedV%28vec2%20p%29%20%7B%0A%20%20return%20vec2%280.0%2C-3.0%2Bp.y%29%3B%0A%7D%0A%0Abool%20isSpray%28vec2%20p%29%20%7B%0A%20%20return%20length%28p%29%20%3E%201.0%20%26%26%20abs%28p.x%29%20%3C%201.0%3B%0A%7D%0A%0Avec2%20sprayV%28vec2%20p%29%20%7B%0A%20%20float%20vy%20%3D%20-1.0%2Bp.y%3B%0A%20%20float%20vx%20%3D%20p.x%20%3E%200.0%20%3F%20%281.0-p.x%29%2Fvy%20%3A%20%28-1.0-p.x%29%2Fvy%3B%0A%20%20return%20vec2%28vx%2Cvy%29%3B%0A%7D%0A%0Abool%20isCircle%28vec2%20p%29%20%7B%0A%20%20return%20length%28p%29%20%3E%201.0%20%26%26%20length%28p%29%20%3C%201.05%3B%0A%7D%0A%0Avec2%20circleV%28vec2%20p%29%20%7B%0A%20%20vec2%20v%20%3D%20vec2%280.%2C%200.%29%3B%0A%20%20v.x%20%3D%20sign%28p.x%29*%20p.y%3B%0A%20%20v.y%20%3D%20-abs%28p.x%29%3B%0A%20%20return%20v%3B%0A%7D%0A%0A%2F%2F%20p.x%20and%20p.y%20are%20current%20coordinates%0A%2F%2F%20v.x%20and%20v.y%20is%20a%20velocity%20at%20point%20p%0Avec2%20get_velocity%28vec2%20p%29%20%7B%0A%20%20vec2%20v%20%3D%20vec2%280.%2C%200.%29%3B%0A%20%20%0A%20%20v%20%3D%20isCircle%28p%29%20%3F%20circleV%28p%29%20%3A%20%0A%20%20%20%20%20%20isUnshadowed%28p%29%20%3F%20unshadowedV%28p%29%20%3A%20%0A%20%20%20%20%20%20isSpray%28p%29%20%3F%20sprayV%28p%29%20%3A%20vec2%281.0%2F0.0%2C1.0%2F0.0%29%3B%0A%20%0A%20%20return%20v%3B%0A%7D&code=bool%20isUnshadowed%28vec2%20p%29%20%7B%0A%20%20bool%20upper%20%3D%20length%28p%29%20%3E%201.0%20%26%26%20p.y%20%3E%200.0%3B%0A%20%20bool%20lower%20%3D%20length%28p%29%20%3E%201.0%20%26%26%20p.y%20%3C%200.0%20%26%26%20abs%28p.x%29%20%3E%201.0%3B%20%0A%20%20return%20upper%20%7C%7C%20lower%3B%0A%7D%0A%0Avec2%20unshadowedV%28vec2%20p%29%20%7B%0A%20%20return%20vec2%280.0%2C-3.0%2Bp.y%29%3B%0A%7D%0A%0Abool%20isSpray%28vec2%20p%29%20%7B%0A%20%20return%20length%28p%29%20%3E%201.0%20%26%26%20abs%28p.x%29%20%3C%201.0%3B%0A%7D%0A%0Avec2%20sprayV%28vec2%20p%29%20%7B%0A%20%20float%20vy%20%3D%20-1.0%2Bp.y%3B%0A%20%20float%20vx%20%3D%20p.x%20%3E%200.0%20%3F%20%281.0-p.x%29%2Fvy%20%3A%20%28-1.0-p.x%29%2Fvy%3B%0A%20%20return%20vec2%28vx%2Cvy%29%3B%0A%7D%0A%0Abool%20isCircle%28vec2%20p%29%20%7B%0A%20%20return%20length%28p%29%20%3E%201.0%20%26%26%20length%28p%29%20%3C%201.05%3B%0A%7D%0A%0Avec2%20circleV%28vec2%20p%29%20%7B%0A%20%20vec2%20v%20%3D%20vec2%280.%2C%200.%29%3B%0A%20%20v.x%20%3D%20sign%28p.x%29*%20p.y%3B%0A%20%20v.y%20%3D%20-abs%28p.x%29%3B%0A%20%20return%20v%3B%0A%7D%0A%0A%2F%2F%20p.x%20and%20p.y%20are%20current%20coordinates%0A%2F%2F%20v.x%20and%20v.y%20is%20a%20velocity%20at%20point%20p%0Avec2%20get_velocity%28vec2%20p%29%20%7B%0A%20%20vec2%20v%20%3D%20vec2%280.%2C%200.%29%3B%0A%20%20%0A%20%20v%20%3D%20isCircle%28p%29%20%3F%20circleV%28p%29%20%3A%20%0A%20%20%20%20%20%20isUnshadowed%28p%29%20%3F%20unshadowedV%28p%29%20%3A%20%0A%20%20%20%20%20%20isSpray%28p%29%20%3F%20sprayV%28p%29%20%3A%20vec2%281.0%2F0.0%2C1.0%2F0.0%29%3B%0A%20%0A%20%20return%20v%3B%0A%7D&pc=10000` },

  { name: 'Mouse-driven Julia Set', params: `dt=0.01&fo=0.9&dp=0.009&cm=3&cx=-0.27144999999999997&cy=0.14175000000000004&w=6.120699999999999&h=6.120699999999999&pc=1000000&vf=%2F%2F%20p.x%20and%20p.y%20are%20current%20coordinates%0A%2F%2F%20v.x%20and%20v.y%20is%20a%20velocity%20at%20point%20p%0Avec2%20get_velocity%28vec2%20p%29%20%7B%0A%20%20vec2%20v%20%3D%20vec2%280.%2C%200.%29%3B%0A%0A%20%20%2F%2F%20change%20this%20to%20get%20a%20new%20vector%20field%0A%20%20float%20a%20%3D%20cursor.zw.x%3B%0Afloat%20b%20%3D%20cursor.zw.y%3B%0Afloat%20sx%20%3D%20p.x%2F2.0%3B%0Afloat%20sy%20%3D%20p.y%2F2.0%3B%0Afloat%20i1x%20%3D%20sx*sx%20-%20sy*sy%2Ba%3B%0Afloat%20i1y%20%3D%20-2.0*sx*sy%2Bb%3B%0Afloat%20i2x%20%3D%20i1x*i1x%20-%20i1y*i1y%2Ba%3B%0Afloat%20i2y%20%3D%20-2.0*i1x*i1y%2Bb%3B%0Afloat%20i3x%20%3D%20i2x*i2x%20-%20i2y*i2y%2Ba%3B%0Afloat%20i3y%20%3D%20-2.0*i2x*i2y%2Bb%3B%0Afloat%20i4x%20%3D%20i3x*i3x%20-%20i3y*i3y%2Ba%3B%0Afloat%20i4y%20%3D%20-2.0*i3x*i3y%2Bb%3B%0Afloat%20i5x%20%3D%20i4x*i4x%20-%20i4y*i4y%2Ba%3B%0Afloat%20i5y%20%3D%20-2.0*i4x*i4y%2Bb%3B%0Afloat%20i6x%20%3D%20i5x*i5x%20-%20i5y*i5y%2Ba%3B%0Afloat%20i6y%20%3D%20-2.0*i5x*i5y%2Bb%3B%0Afloat%20i7x%20%3D%20i6x*i6x%20-%20i6y*i6y%2Ba%3B%0Afloat%20i7y%20%3D%20-2.0*i6x*i6y%2Bb%3B%0Afloat%20i8x%20%3D%20i7x*i7x%20-%20i7y*i7y%2Ba%3B%0Afloat%20i8y%20%3D%20-2.0*i7x*i7y%2Bb%3B%0Afloat%20i9x%20%3D%20i8x*i8x%20-%20i8y*i8y%2Ba%3B%0Afloat%20i9y%20%3D%20-2.0*i8x*i8y%2Bb%3B%0A%0A%20%20float%20n%20%3D%20sqrt%28i9x*i9x%2Bi9y*i9y%29%3B%0A%0Av.x%20%3D%20n%20%3E%202.0%20%3F%20-p.x%2F10.0%20%3A%20p.x%2F10.0%3B%0Av.y%20%3D%20n%20%3E%202.0%20%3F%20-p.y%2F10.0%20%3A%20p.y%2F10.0%3B%0A%0A%20%20return%20v%3B%0A%7D&code=%2F%2F%20p.x%20and%20p.y%20are%20current%20coordinates%0A%2F%2F%20v.x%20and%20v.y%20is%20a%20velocity%20at%20point%20p%0Avec2%20get_velocity%28vec2%20p%29%20%7B%0A%20%20vec2%20v%20%3D%20vec2%280.%2C%200.%29%3B%0A%0A%20%20%2F%2F%20change%20this%20to%20get%20a%20new%20vector%20field%0A%20%20float%20a%20%3D%20cursor.zw.x%3B%0Afloat%20b%20%3D%20cursor.zw.y%3B%0Afloat%20sx%20%3D%20p.x%2F2.0%3B%0Afloat%20sy%20%3D%20p.y%2F2.0%3B%0Afloat%20i1x%20%3D%20sx*sx%20-%20sy*sy%2Ba%3B%0Afloat%20i1y%20%3D%20-2.0*sx*sy%2Bb%3B%0Afloat%20i2x%20%3D%20i1x*i1x%20-%20i1y*i1y%2Ba%3B%0Afloat%20i2y%20%3D%20-2.0*i1x*i1y%2Bb%3B%0Afloat%20i3x%20%3D%20i2x*i2x%20-%20i2y*i2y%2Ba%3B%0Afloat%20i3y%20%3D%20-2.0*i2x*i2y%2Bb%3B%0Afloat%20i4x%20%3D%20i3x*i3x%20-%20i3y*i3y%2Ba%3B%0Afloat%20i4y%20%3D%20-2.0*i3x*i3y%2Bb%3B%0Afloat%20i5x%20%3D%20i4x*i4x%20-%20i4y*i4y%2Ba%3B%0Afloat%20i5y%20%3D%20-2.0*i4x*i4y%2Bb%3B%0Afloat%20i6x%20%3D%20i5x*i5x%20-%20i5y*i5y%2Ba%3B%0Afloat%20i6y%20%3D%20-2.0*i5x*i5y%2Bb%3B%0Afloat%20i7x%20%3D%20i6x*i6x%20-%20i6y*i6y%2Ba%3B%0Afloat%20i7y%20%3D%20-2.0*i6x*i6y%2Bb%3B%0Afloat%20i8x%20%3D%20i7x*i7x%20-%20i7y*i7y%2Ba%3B%0Afloat%20i8y%20%3D%20-2.0*i7x*i7y%2Bb%3B%0Afloat%20i9x%20%3D%20i8x*i8x%20-%20i8y*i8y%2Ba%3B%0Afloat%20i9y%20%3D%20-2.0*i8x*i8y%2Bb%3B%0A%0A%20%20float%20n%20%3D%20sqrt%28i9x*i9x%2Bi9y*i9y%29%3B%0A%0Av.x%20%3D%20n%20%3E%202.0%20%3F%20-p.x%2F10.0%20%3A%20p.x%2F10.0%3B%0Av.y%20%3D%20n%20%3E%202.0%20%3F%20-p.y%2F10.0%20%3A%20p.y%2F10.0%3B%0A%0A%20%20return%20v%3B%0A%7D` },

  { name: 'Isobaric forest', params: `dt=0.01&fo=0.995&dp=0.009&cm=3&cx=0.006349999999999856&cy=0.000200000000000089&w=4.1643&h=4.1643&vf=%2F%2F%20total%20shader%20is%20a%20_bit_%20too%20long%20to%20just%20put%20in%20the%20url.%20Find%20it%20at%0A%2F%2F%20https%3A%2F%2Fgist.github.com%2FCensoredUsername%2Ff0f2288c92bf6488fb964f9ce52bd520%0A%23include%20https%3A%2F%2Fgist.githubusercontent.com%2FCensoredUsername%2Ff0f2288c92bf6488fb964f9ce52bd520%2Fraw%2Fbf987ebd6bf43d53028078709b65421882edaf65%2Fforest.glsl&code=%2F%2F%20total%20shader%20is%20a%20_bit_%20too%20long%20to%20just%20put%20in%20the%20url.%20Find%20it%20at%0A%2F%2F%20%0A%23include%20https%3A%2F%2Fgist.githubusercontent.com%2FCensoredUsername%2Ff0f2288c92bf6488fb964f9ce52bd520%2Fraw%2Fbf987ebd6bf43d53028078709b65421882edaf65%2Fforest.glsl&pc=30000` },

  { name: 'Hyperjump', params: `dt=0.01&fo=0.998&dp=0.009&cm=2&cx=0.523299999999999&cy=1.2703999999999995&w=48.3842&h=48.3842&vf=vec2%20circle%28vec2%20p%2C%20vec2%20c%29%20%7B%0A%20%20vec2%20c0%20%3D%20p%20-%20c%3B%0A%20%20vec2%20p0%20%3D%20vec2%28-c0.y%2C%20c0.x%29%3B%0A%20%20float%20l%20%3D%20length%28p0%29%3B%0A%20%20return%20p0%20*%20exp%28-l*sin%28frame*0.01%29%29%3B%0A%7D%0A%2F%2F%20p.x%20and%20p.y%20are%20current%20coordinates%0A%2F%2F%20v.x%20and%20v.y%20is%20a%20velocity%20at%20point%20p%0Avec2%20get_velocity%28vec2%20p%29%20%7B%0A%20%20vec2%20v%20%3D%20circle%28p%2C%20vec2%280.%2C%200.%29%29%3B%0A%0A%20%20float%20r%20%3D%207.%3B%0A%20%20for%20%28int%20i%20%3D%200%3B%20i%20%3C%2011%3B%20%2B%2Bi%29%20%7B%0A%20%20%20%20float%20a%20%3D%200.01%20*%20frame%20%2B%20float%28i%29%20*%202.*PI%2F7.%3B%0A%20%20%20%20v%20%2B%3D%20circle%28p%2C%20vec2%28r%20*%20cos%28a%29%20%2C%20r%20*%20sin%28a%29%29%29%3B%0A%20%20%7D%0A%20%20return%20v%3B%0A%7D&code=vec2%20circle%28vec2%20p%2C%20vec2%20c%29%20%7B%0A%20%20vec2%20c0%20%3D%20p%20-%20c%3B%0A%20%20vec2%20p0%20%3D%20vec2%28-c0.y%2C%20c0.x%29%3B%0A%20%20float%20l%20%3D%20length%28p0%29%3B%0A%20%20return%20p0%20*%20exp%28-l*sin%28frame*0.01%29%29%3B%0A%7D%0A%2F%2F%20p.x%20and%20p.y%20are%20current%20coordinates%0A%2F%2F%20v.x%20and%20v.y%20is%20a%20velocity%20at%20point%20p%0Avec2%20get_velocity%28vec2%20p%29%20%7B%0A%20%20vec2%20v%20%3D%20circle%28p%2C%20vec2%280.%2C%200.%29%29%3B%0A%0A%20%20float%20r%20%3D%207.%3B%0A%20%20for%20%28int%20i%20%3D%200%3B%20i%20%3C%202%3B%20%2B%2Bi%29%20%7B%0A%20%20%20%20float%20a%20%3D%200.01%20*%20frame%20%2B%20float%28i%29%20*%202.*PI%2F7.%3B%0A%20%20%20%20v%20%2B%3D%20circle%28p%2C%20vec2%28r%20*%20cos%28a%29%20%2C%20r%20*%20sin%28a%29%29%29%3B%0A%20%20%7D%0A%20%20return%20v%3B%0A%7D&pc=30000` },

  { name: 'Particle Grinder', params: `dt=0.01&fo=0.998&dp=0.009&cm=1&cx=0.028149999999999675&cy=0.08830000000000005&w=9.045300000000001&h=9.045300000000001&vf=vec2%20tensor%28vec2%20p%2C%20vec2%20c0%2C%20vec4%20abcd%2C%20float%20N%29%20%7B%0A%20%20vec2%20p0%20%3D%20p%20-%20c0%3B%20%20%0A%20%20float%20theta%20%3D%20atan%28p0.y%2C%20p0.x%29%3B%0A%20%20float%20c%20%3D%20cos%28N%20*%20theta%29%3B%0A%20%20float%20s%20%3D%20sin%28N%20*%20theta%29%3B%0A%20%20return%20length%28p0%29%20*%20vec2%28abcd%5B2%5D%20*%20c%20%2B%20abcd%5B3%5D%20*%20s%2C%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20abcd%5B0%5D%20*%20c%20%2B%20abcd%5B1%5D%20*%20s%29%3B%0A%7D%0A%0Avec2%20get_velocity%28vec2%20p%29%20%7B%0A%20%20vec2%20v%20%3D%20vec2%280.%2C%200.%29%3B%0A%20%20v%20%3D%20tensor%28p%2C%20vec2%280.%2C%200.%29%2C%20vec4%28-2.%2C%200.%2C%200.%2C%201.%29%2C%202.%29%3B%0A%20%20return%20v%3B%0A%7D&code=vec2%20tensor%28vec2%20p%2C%20vec2%20c0%2C%20vec4%20abcd%2C%20float%20N%29%20%7B%0A%20%20vec2%20p0%20%3D%20p%20-%20c0%3B%20%20%0A%20%20float%20theta%20%3D%20atan%28p0.y%2C%20p0.x%29%3B%0A%20%20float%20c%20%3D%20cos%28N%20*%20theta%29%3B%0A%20%20float%20s%20%3D%20sin%28N%20*%20theta%29%3B%0A%20%20return%20length%28p0%29%20*%20vec2%28abcd%5B2%5D%20*%20c%20%2B%20abcd%5B3%5D%20*%20s%2C%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20abcd%5B0%5D%20*%20c%20%2B%20abcd%5B1%5D%20*%20s%29%3B%0A%7D%0A%0Avec2%20get_velocity%28vec2%20p%29%20%7B%0A%20%20vec2%20v%20%3D%20vec2%280.%2C%200.%29%3B%0A%20%20v%20%3D%20tensor%28p%2C%20vec2%280.%2C%200.%29%2C%20vec4%28-2.%2C%200.%2C%200.%2C%201.%29%2C%202.%29%3B%0A%20%20return%20v%3B%0A%7D` },

  { name: 'Hyperbolic flux [interactive]', params: `dt=0.001&fo=0.999&dp=0.009&cm=3&cx=-0.11990000000000034&cy=0.018899999999999917&w=8.5442&h=8.5442&vf=%2F%2F%20p.x%20and%20p.y%20are%20current%20coordinates%0A%2F%2F%20v.x%20and%20v.y%20is%20a%20velocity%20at%20point%20p%0Avec2%20get_velocity%28vec2%20p%29%20%7B%0A%20%20vec2%20v%20%3D%20vec2%280.%2C%200.%29%3B%0A%0A%20%20float%20ax%20%3D%20%28cursor.zw.x%20-%20p.x%29%3B%0A%20%20float%20ay%20%3D%20%28cursor.zw.y%20-%20p.y%29%3B%0A%20%20float%20al%20%3D%20sqrt%28ax*ax%2Bay*ay%29%3B%0A%20%20%0A%20%20float%20rx%20%3D%20%28p.x-cursor.xy.x%29%3B%0A%20%20float%20ry%20%3D%20%28p.y-cursor.xy.y%29%3B%0A%20%20float%20rl%20%3D%20sqrt%28rx*rx%2Bry*ry%29%3B%0A%20%20%0A%20%20%2F%2F%20change%20this%20to%20get%20a%20new%20vector%20field%0A%20%20v.x%20%3D%20%28ax*ax*ry%20%2B%20ay*rx*rx%29%2F%28al*rl%29%3B%0A%20%20v.y%20%3D%20%28ay*ay*rx%20%2B%20ax*ry*ry%29%2F%28al*rl%29%3B%0A%0A%20%20return%20v%3B%0A%7D&code=%2F%2F%20p.x%20and%20p.y%20are%20current%20coordinates%0A%2F%2F%20v.x%20and%20v.y%20is%20a%20velocity%20at%20point%20p%0Avec2%20get_velocity%28vec2%20p%29%20%7B%0A%20%20vec2%20v%20%3D%20vec2%280.%2C%200.%29%3B%0A%0A%20%20float%20ax%20%3D%20%28cursor.zw.x%20-%20p.x%29%3B%0A%20%20float%20ay%20%3D%20%28cursor.zw.y%20-%20p.y%29%3B%0A%20%20float%20al%20%3D%20sqrt%28ax*ax%2Bay*ay%29%3B%0A%20%20%0A%20%20float%20rx%20%3D%20%28p.x-cursor.xy.x%29%3B%0A%20%20float%20ry%20%3D%20%28p.y-cursor.xy.y%29%3B%0A%20%20float%20rl%20%3D%20sqrt%28rx*rx%2Bry*ry%29%3B%0A%20%20%0A%20%20%2F%2F%20change%20this%20to%20get%20a%20new%20vector%20field%0A%20%20v.x%20%3D%20%28ax*ax*ry%20%2B%20ay*rx*rx%29%2F%28al*rl%29%3B%0A%20%20v.y%20%3D%20%28ay*ay*rx%20%2B%20ax*ry*ry%29%2F%28al*rl%29%3B%0A%0A%20%20return%20v%3B%0A%7D&pc=1000000` },

  { name: 'Swim against the current', params: `dt=0.01&fo=0.998&dp=0.009&cm=3&cx=3.0524500000000003&cy=-1.3792&w=8.5397&h=8.5397&code=float%20dx1%20%3D%20cursor.zw.x%20-%20p.x%3B%0Afloat%20dy1%20%3D%20cursor.zw.y%20-%20p.y%3B%0Afloat%20dl1%20%3D%20sqrt%28dx1*dx1%2Bdy1*dy1%29%3B%0Adx1%20%3D%20dx1%2Fdl1%3B%0Ady1%20%3D%20dy1%2Fdl1%3B%0A%0Afloat%20dx2%20%3D%20cursor.xy.x%20-%20p.x%3B%0Afloat%20dy2%20%3D%20cursor.xy.y%20-%20p.y%3B%0Afloat%20dl2%20%3D%20sqrt%28dx2*dx2%2Bdy2*dy2%29%3B%0Adx2%20%3D%20dx2%2Fdl2%3B%0Ady2%20%3D%20dy2%2Fdl2%3B%0A%0Afloat%20fx%20%3D%20cursor.xy.x%20-%20cursor.zw.x%3B%0Afloat%20fy%20%3D%20cursor.xy.y%20-%20%0Acursor.zw.y%3B%0Afloat%20fl%20%3D%20sqrt%28fx*fx%2Bfy*fy%29%3B%0Afx%20%3D%20-fx%2Ffl%3B%0Afy%20%3D%20-fy%2Ffl%3B%0A%0Afloat%20d1%20%3D%20%28dx1*fx%20%2B%20dy1*fy%29%2F%28dl1*fl%29%3B%0Afloat%20d2%20%3D%201.-d1%3B%0Av.x%20%3D%20d1*fx%2Bd2*dx2%3B%0Av.y%20%3D%20d1*fy%2Bd2*dy2%3B&pc=100900` },

  { name: 'Eye of Sauron (interactive)', params: `dt=0.01&fo=0.988&dp=0.008&cm=2&cx=0.3991000000000007&cy=-0.11315000000000008&w=37.0984&h=37.0984&code=%2F%2F%20calculate%20distortion%20map%20%28reverse%20solver%29%0A%2F%2F%20the%20distortion%20map%20is%20based%20on%20a%20sphere%2C%20but%20smoothed%20to%20the%20ends%3A%20sqrt%281-%28x%5E8%2F%28x%5E8-1%29%29%5E%281%2F4%29%29%0A%0Afloat%20dist_radius%20%3D%207.8%3B%0Avec2%20distortion%20%3D%20cursor.zw%3B%0Aif%20%28length%28distortion%29%20%3E%204.5%29%20%7B%0A%20%20%20%20distortion%20%3D%20normalize%28distortion%29%20*4.5%3B%0A%7D%0A%0A%2F%2F%20iterative%20reverse%20algo.%20after%20all%2C%20we%20knew%20the%20result%20position%20already%2C%20we%27re%20trying%20to%20reason%20back%20to%20what%20the%20original%20position%20was%0Avec2%20d%20%3D%20p%3B%0Afor%20%28int%20i%20%3D%200%3B%20i%20%3C%2010%3B%20i%2B%2B%29%20%7B%0A%20%20%20%20%2F%2F%20calculate%20distortion%20effect%20magnitude%0A%20%20%20%20float%20d_scale%20%3D%20pow%28length%28d%29%20%2F%20dist_radius%2C%208.%29%3B%0A%20%20%20%20%2F%2F%20pseudo%20sphere%20map%0A%20%20%20%20d_scale%20%3D%20pow%281.%20-%20pow%28d_scale%20%2F%20%28d_scale%20%2B%201.%29%2C%20.25%29%2C%20.5%29%3B%0A%20%20%20%20d%20%3D%20p%20-%20distortion%20*%20d_scale%3B%0A%7D%0A%0A%2F%2F%20calculate%20differentials%2C%20working%20backwards%20%28i.e.%20what%20change%20in%20p%20would%20result%20from%20a%20change%20in%20d%29%0Avec2%20d_dx%20%20%3D%20d%20%2B%20vec2%280.1%2C%200.0%29%3B%0Afloat%20d_dx_scale%20%3D%20pow%28length%28d_dx%29%20%2F%20dist_radius%2C%208.%29%3B%0Ad_dx_scale%20%3D%20pow%281.%20-%20pow%28d_dx_scale%20%2F%20%28d_dx_scale%20%2B%201.%29%2C%20.25%29%2C%20.5%29%3B%0Avec2%20dx%20%3D%20%28d_dx%20%2B%20distortion%20*%20d_dx_scale%20-%20p%29%20%2F%200.1%3B%0A%0Avec2%20d_dy%20%20%3D%20d%20%2B%20vec2%280.0%2C%200.1%29%3B%0Afloat%20d_dy_scale%20%3D%20pow%28length%28d_dy%29%20%2F%20dist_radius%2C%208.%29%3B%0Ad_dy_scale%20%3D%20pow%281.%20-%20pow%28d_dy_scale%20%2F%20%28d_dy_scale%20%2B%201.%29%2C%20.25%29%2C%20.5%29%3B%0Avec2%20dy%20%3D%20%28d_dy%20%2B%20distortion%20*%20d_dy_scale%20-%20p%29%20%2F%200.1%3B%0A%0A%2F%2F%20center%20parts%0Afloat%20pupilrange%20%3D%20length%28vec2%28d.y%2C%20d.x%20%2B%206.*sign%28d.x%29%29%29%3B%0Avec2%20pupilborder%20%3D%202.6*vec2%28-d.y%2C%20%28d.x%20%2B%206.*sign%28d.x%29%29%20%29%3B%0Av%20%2B%3D%20pupilborder%20*%20smoothstep%286.6%2C%206.8%2C%20pupilrange%29%20*%20%281.%20-%20smoothstep%286.9%2C%207.1%2C%20pupilrange%29%29%3B%0A%0Afloat%20range%20%3D%20length%28d%29%3B%0Avec2%20iris%20%3D%207.*d%2Fsqrt%28range%29%3B%0Av%20%2B%3D%20iris%20*%20smoothstep%287.0%2C%207.5%2C%20pupilrange%29%20*%20%281.%20-%20smoothstep%283.8%2C%204.0%2C%20range%29%29%3B%0A%0Avec2%20pupil%20%3D%201.*vec2%28d.x%2B1.*sign%28d.x%29%2C%20d.y%29%3B%0Av%20%2B%3D%20pupil%20*%20%281.%20-%20smoothstep%286.6%2C%206.8%2C%20pupilrange%29%29%3B%0A%0A%2F%2F%20absolute%20parts%0Avec2%20psign%20%3D%20sign%28d%29%3B%0Avec2%20a%20%3D%20abs%28d%29%3B%0Avec2%20vabs%20%3D%20vec2%280.0%2C%200.0%29%3B%0A%0Afloat%20borderrange%20%3D%20length%28vec2%28d.x%2C%20d.y%20%2B%207.*sign%28d.y%29%29%29%3B%0Avec2%20border%20%3D%20-1.5*vec2%28a.y%20%2B%207.*sign%28a.y%29%20-%203.%2F%28a.y%20%2B%201.%29%2C%20-a.x%20%2B%203.%2F%28a.x%20%2B%201.%29%29%3B%0Avabs%20%2B%3D%20border%20*%20smoothstep%2810.8%2C%2011.25%2C%20borderrange%29%20*%20%281.%20-%20smoothstep%2811.25%2C%2011.7%2C%20borderrange%29%29%20*%20smoothstep%283.8%2C%204.1%2C%20range%29%20*%20%28a.y%20%2F%20%28a.y%20%2B%201.%29%29%3B%0A%0Avec2%20irisborder%20%3D%205.*vec2%28a.y%2C%20-a.x%29%20*%20%28a.y%20%2F%20%28a.y%20%2B%203.%29%29%2B%20.2%20*%20a%3B%0Avabs%20%2B%3D%20irisborder%20*%20smoothstep%283.8%2C%204.25%2C%20range%29%20*%20%281.%20-%20smoothstep%284.25%2C%204.7%2C%20range%29%29%3B%0A%0Avec2%20white%20%3D%2012.*vec2%281.0%2C%20-0.2%20*%20%28a.y%29%29%3B%0Avabs%20%2B%3D%20white%20*%20smoothstep%284.3%2C%204.5%2C%20range%29%20*%20%281.%20-%20smoothstep%2811.%2C%2011.3%2C%20borderrange%29%29%3B%0A%0Av%20%2B%3D%20vabs%20*%20psign%3B%0A%0A%2F%2F%20outside%20part%0Avec2%20outside%20%3D%20d%20%2F%20pow%28borderrange%20-%2010.%2C%202.%29%3B%0Av%20-%3D%20outside%20*%20smoothstep%2811.3%2C%2011.5%2C%20borderrange%29%3B%0A%0A%2F%2F%20velocity%20distortion%20mapping%0Av%20%3D%20v.x%20*%20dx%20%2B%20v.y%20*%20dy%3B%0A%0A%2F%2F%20color%20mapping%0Aif%20%28length%28v%29%20%3E%200.01%29%20%7B%0A%20%20%20%20v%20%3D%20normalize%28v%29%20*%2010.%3B%0A%7D%0Av%20%3D%20v%20%2F%20%281.%20%2B%200.1%20*%20%28borderrange%20-%2010.%29%20*%20smoothstep%2811.5%2C%2012.5%2C%20borderrange%29%29%3B%0A%0A&pc=30000` },

  { name: 'Combination of two fields. One follows cursor', params: `dt=0.01&fo=0.998&dp=0.009&cm=1&cx=0&cy=0&w=8.5398&h=8.5398&code=vec2%20p1%20%3D%20p%20-%20vec2%28-2.%2C%200.%29%3B%0Avec2%20p2%20%3D%20p%20-%20cursor.zw%3B%0A%0Afloat%20l1%20%3D%20length%28p1%29%2C%20l2%20%3D%20length%28p2%29%3B%0A%0Av%20%3D%20vec2%28-p1.y%2C%20p1.x%29%2F%28l1%20*%20l1%29%20%2B%20vec2%28-p2.y%2C%20p2.x%29%2F%28l2%20*%20l2%29%3B` },

  { name: '[Randomized] nice symmetry', params: `dt=0.01&fo=0.988&dp=0.008&cm=2&cx=-2.6390499999999992&cy=-1.1419499999999996&w=46.508700000000005&h=46.508700000000005&code=v.x%20%3D%20p.y%2Fcos%28length%28p%29%29%3B%0Av.y%20%3D%20max%28%28log%28p.y%29%2Bp.x%29%2Cp.x%29%3B%0A%20%20&pc=20000` },

  { name: 'A city block from a parallel Universe (by @MananG_8)', params: `dt=0.01&fo=0.988&dp=0.008&cm=1&cx=0.6165500000000002&cy=-1.87745&w=9.0455&h=9.0455&code=v.x%20%3D%20sin%28tan%28p.x%29%29*cos%28tan%28p.y%29%29%3B%0Av.y%20%3D%20sin%28tan%28p.y%29%29*cos%28tan%28p.x%29%29%3B%0A%20%20&pc=20000` },

  { name: '♥ by @SAKrisT', params: `dt=0.01&fo=0.998&dp=0.009&cm=2&cx=-1.4246499999999997&cy=0.92285&w=8.5397&h=8.5397&code=float%20size%20%3D%201.0%3B%0Avec2%20o%20%3D%20%28p%29%2F%281.6*%20size%29%3B%0A%20%20float%20a%20%3D%20o.x*o.x%2Bo.y*o.y-0.3%3B%0A%20v%20%3D%20vec2%28step%28a*a*a%2C%20o.x*o.x*o.y*o.y*o.y%29%29%3B%0A%20%20` },

  { name: 'Dynamic vector field by Evgeniy Andreev. Not defined by physical system, but beautiful.', params: `dt=0.01&fo=0.998&dp=0.009&cm=3&cx=-1.6564499999999995&cy=-0.36424999999999974&w=24.7317&h=24.7317&code=float%20dt%20%3D%200.01%3B%0Afloat%20t%20%3D%20frame*dt%3B%0Afloat%20w%20%3D%202.*PI%2F5.%3B%0Afloat%20A%20%3D%202.%3B%0A%0Afloat%20d%20%3D%20sqrt%28p.x*p.x%20%2B%20p.y*p.y%29%3B%0Av.x%20%3D%20A*cos%28w*t%2Fd%29%3B%0Av.y%20%3D%20A*sin%28w*t%2Fd%29%3B&pc=3000` },

  { name: 'Behold (by /u/censored_username)', params: `dt=0.01&fo=0.988&dp=0.008&cm=2&cx=0.12704999999999966&cy=0.1923499999999998&w=22.5709&h=22.5709&code=float%20x%20%3D%20abs%28p.x%29%20-%205.%3B%0Afloat%20side%20%3D%20sign%28p.x%29%3B%0Afloat%20range%20%3D%20length%28vec2%28x%2C%20p.y%29%29%3B%0Afloat%20irisrange%20%3D%20length%28vec2%28x%2C%20p.y%20%2B%202.*sign%28p.y%29%29%29%3B%0A%0Avec2%20border%20%3D%201.*vec2%28p.y%20%2B%202.2*sign%28p.y%29%20*%20%28p.y*p.y%20%2F%20%28p.y*p.y%20%2B%200.01%29%29%2C%20-x%29%3B%0A%0Avec2%20outside%20%3D%20vec2%28x%20%2F%20%281.%2B10.%2Fabs%28p.x*p.x%29%29%2C%20p.y%29%3B%0A%0Avec2%20spiral%20%3D%20vec2%28p.y%2C%20-x%29%3B%0A%0Avec2%20iris%20%3D%20sin%28-range%20*%2010.%29%20*%20spiral%20%2B%200.05*vec2%28x%2C%20p.y%29%3B%0A%0Av%20%20%2B%3D%20outside%20*%20%28smoothstep%284.0%2C%204.5%2C%20irisrange%29%2Frange*5.%20-%205.*smoothstep%280.9%2C%200.7%2C%20range%29%2Frange%29%3B%0Av%20%2B%3D%20border%20*%20smoothstep%283.5%2C%204.%2C%20irisrange%29%20*%20smoothstep%284.5%2C%204.%2C%20irisrange%29%3B%0Av%20%2B%3D%20iris%20*%20smoothstep%282.0%2C%201.5%2C%20range%29%20*%20smoothstep%280.8%2C%201.%2C%20range%29%3B%0Av%20-%3D%2010.0*spiral%20*%20smoothstep%281.0%2C%200.8%2C%20range%29%20*%20smoothstep%280.7%2C%200.9%2C%20range%29%3B%0A%0Av.x%20*%3D%20side%3B%0Av%20*%3D%20-1.%3B&pc=30000` }
];

const keyMap = {
  cm: 'colorMode',
  dt: 'timeStep',
  fo: 'fadeOut',
  dp: 'dropProbability',
  pc: 'particleCount',
  vf: 'code'
};

let output = presets.map(rawPreset => {
  const parts = rawPreset.params.split('&');
  const preset = {
    name: rawPreset.name
  };

  parts.forEach(part => {
    const subparts = part.split('=');
    let value = subparts[1];
    const numeric = parseFloat(value);
    if (!Number.isNaN(numeric)) {
      value = numeric;
    } else {
      value = decodeURIComponent(value);
    }

    let key = keyMap[subparts[0]] || subparts[0];
    preset[key] = value;
  });

  return preset;
});

output = JSON.stringify(output, null, 2)
  .replace(/"code": "(.*)"/g, function(match, capture) {
    return '"code": `' + capture.replace(/\\n/g, '\n      ') + '`';
  });

output = 'export default ' + output + ';\n';
fs.writeFileSync('util/autoPresets.js', output);
