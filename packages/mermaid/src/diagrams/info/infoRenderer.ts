// @ts-ignore - TODO: fix ts error from d3
import { select } from 'd3';
import { log } from '../../logger.js';
import { getConfig } from '../../config.js';
import type { DrawDefinition, SVG } from '../../diagram-api/types.js';

/**
 * Draws a an info picture in the tag with id: id based on the graph definition in text.
 *
 * @param text - The text of the diagram.
 * @param id - The id of the diagram which will be used as a DOM element id.
 * @param version - MermaidJS version.
 */
export const draw: DrawDefinition = (text, id, version) => {
  try {
    log.debug('rendering info diagram\n' + text);

    const securityLevel = getConfig().securityLevel;
    // handle root and document for when rendering in sandbox mode
    let sandboxElement: SVG | undefined;
    if (securityLevel === 'sandbox') {
      sandboxElement = select('#i' + id);
    }
    let root;
    if (securityLevel === 'sandbox' && sandboxElement !== undefined) {
      root = select(sandboxElement.nodes()[0].contentDocument!.body);
    } else {
      root = select('body');
    }

    // @ts-ignore - TODO: figure out how to resolve this
    const svg = root.select('#' + id);
    svg.attr('height', 100);
    svg.attr('width', 400);

    const g = svg.append('g');

    g.append('text') // text label for the x axis
      .attr('x', 100)
      .attr('y', 40)
      .attr('class', 'version')
      .attr('font-size', '32px')
      .style('text-anchor', 'middle')
      .text('v ' + version);
  } catch (e) {
    log.error('error while rendering info diagram', e);
  }
};

export default { draw };
