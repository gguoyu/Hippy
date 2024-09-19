/*
 * Tencent is pleased to support the open source community by making
 * Hippy available.
 *
 * Copyright (C) 2017-2019 THL A29 Limited, a Tencent company.
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import ViewNode from '../../renderer/view-node';
import { SelectorsMatch } from '../css-selectors-match';
import { SiblingGroup } from './sibling-group';

export class ChildGroup {
  public dynamic: boolean;
  public selectors: SiblingGroup[];

  public constructor(selectors: SiblingGroup[]) {
    this.selectors = selectors;
    this.dynamic = selectors.some((sel: SiblingGroup) => sel.dynamic);
  }

  public match(matchNode?: ViewNode): ViewNode | undefined {
    let node: ViewNode | undefined = matchNode;
    if (!node) return undefined;
    const pass = this.selectors.every((sel: SiblingGroup, i: number) => {
      if (i !== 0) {
        node = node?.parentNode;
      }
      return !!node && !!sel.match(node);
    });
    return pass ? node : undefined;
  }

  public mayMatch(matchNode?: ViewNode): ViewNode | undefined {
    let node: ViewNode | undefined = matchNode;
    if (!node) return undefined;
    const pass = this.selectors.every((sel: SiblingGroup, i: number) => {
      if (i !== 0) {
        node = node?.parentNode;
      }
      return !!node && !!sel.mayMatch(node);
    });
    return pass ? node : undefined;
  }

  public trackChanges(matchNode: ViewNode, map: SelectorsMatch) {
    let node: ViewNode | undefined = matchNode;
    this.selectors.forEach((sel: SiblingGroup, i: number) => {
      if (i !== 0) {
        node = node?.parentNode;
      }
      if (!node) {
        return;
      }
      sel.trackChanges(node, map);
    });
  }
}
