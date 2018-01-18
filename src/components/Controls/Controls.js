import React, { PureComponent } from 'react';
import * as dg from 'dis-gui';

export default class Controls extends PureComponent {
  render() {
    let names = this.props.shaders.map(shader => shader.name);
    let customUniforms = {};
    // customUniforms has been placed on the material to help separate the names of them from the material uniforms,
    // which may contain more that were added by three.js when creating the shadermaterial.
    if (
      this.props.currentShader &&
      typeof this.props.currentShader.customUniforms !== 'undefined'
    ) {
      customUniforms = this.props.currentShader.customUniforms;
    }

    return (
      <dg.GUI>
        <dg.Select
          label="Shader"
          options={names}
          onChange={shaderName => {
            this.props.onShaderSelect(shaderName);
          }}
        />

        {Object.keys(customUniforms).map(key => {
          //console.log(this.props.currentShader.uniforms[key]);
          let cu = this.props.currentShader.uniforms[key];
          switch (cu.type) {
            case 'c':
              let col = cu.value;
              return (
                <dg.Color
                  key={key}
                  label={key}
                  expanded={false}
                  red={col.r * 256}
                  green={col.g * 256}
                  blue={col.b * 256}
                  onChange={newColor => {
                    col.setRGB(
                      newColor.red / 256,
                      newColor.green / 256,
                      newColor.blue / 256
                    );
                  }}
                />
              );
            case 'f':
              return (
                <dg.Number
                  key={key}
                  label={key}
                  value={cu.value}
                  min={cu.min}
                  max={cu.max}
                  step={cu.step}
                  onChange={val => {
                    cu.value = val;
                  }}
                />
              );
            default:
              return '';
          }
          //return <dg.Text label={key} key={key} value={key} />;
        })}
      </dg.GUI>
    );
  }

  // render() {
  //   if (this.props.shaders) {
  //     let output = <dg.GUI>;
  //     this.props.shaders.forEach(element => {
  //       console.log(element);
  //     });
  //   }
  //   return <div>testing</div>;
  // }

  // render() {
  //   return (
  //     <dg.GUI>
  //       <dg.Text label="Text" value="Hello world!" />
  //       <dg.Number label="Number" value={65536} />
  //       <dg.Number label="Range" value={512} min={-1024} max={1024} step={64} />
  //       <dg.Checkbox label="Checkbox" checked={true} />
  //       <dg.Select
  //         label="Select"
  //         options={['Option one', 'Option two', 'Option three']}
  //       />
  //       <dg.Button label="Button" />
  //       <dg.Folder label="Folder" expanded={true}>
  //         <dg.Text label="Text" value="Hello folder!" />
  //         <dg.Number label="Number" value={2} />
  //         <dg.Folder label="Subfolder" expanded={true}>
  //           <dg.Text label="Text" value="Hello subfolder!" />
  //           <dg.Number label="Number" value={2} />
  //         </dg.Folder>
  //       </dg.Folder>
  //       <dg.Color
  //         label="Color"
  //         expanded={true}
  //         red={0}
  //         green={128}
  //         blue={255}
  //       />
  //       <dg.Gradient label="Gradient" expanded={true} />
  //     </dg.GUI>
  //   );
  // }
}