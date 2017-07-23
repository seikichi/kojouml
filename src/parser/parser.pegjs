// PlantUML Parser
{
  var _ = require('lodash');

  function mapByIndex(seq, index) {
    return seq.map(function (v) { return v[index]; });
  };
}

Main = Header diagram:Diagram Footer { return diagram; } / Diagram

// Common
EOF = !. { return ''; }
SP = ' ' / '\t' / '\u00A0'
Newline = '\n' / c1:'\r' c2:'\n'? { return c1 + c2 || ''; }
Endline = Newline / EOF
Emptyline = SP* Newline
Blanklines = (SP* Newline &(SP* Endline))* SP* Endline
NotSpace = !SP !Newline c:. { return c; }
NotNewline = !Newline c:. { return c; }
Rawline = raw:(!Newline .)* nl:Newline { return mapByIndex(raw, 1).join('') + nl; }
DoubleQuote = '"' / '\u201c' / '\u201d' / '\u00ab' / '\u00bb'
DoubleQuotedString = DoubleQuote vs:(!DoubleQuote NotNewline)+ DoubleQuote {
  return mapByIndex(vs, 1).join('');
}
AlphaNumericAscii = [A-Za-z0-9]
Quote = "'" / '\u2018' / '\u2019'

// Diagram
Header = Emptyline* SP* '@startuml' Emptyline
Footer = SP* '@enduml' Blanklines?
Diagram = children:Element* {
  return { children: children };
}
Element = Emptyline* e:(Title / Caption / Comment / Member / Link / Class) Blanklines? { return e; }

// Title
Title = MultilineTitle / SinglelineTitle
SinglelineTitle = 'title' (SP* ':' SP* / SP+) &(SP* NotSpace) cs:NotNewline+ {
  return { type: 'title', value: cs.join('') };
}
MultilineTitleBegin = 'title' Emptyline
MultilineTitleEnd = 'end' SP+ 'title'
MultilineTitle = MultilineTitleBegin vs:(!MultilineTitleEnd .)+ MultilineTitleEnd {
  return {
    type: 'title',
    value: mapByIndex(vs, 1).join(''),
  };
}

// Caption
Caption = 'caption' (SP* ':' SP* / SP+) &(SP* NotSpace) cs:NotNewline+ {
  return { type: 'caption', value: cs.join('') };
}

// Comment
Comment = MultilineComment / SinglelineComment
SinglelineComment = SP* Quote SP* cs:NotNewline+ {
  return { type: 'comment', value: cs.join('') };
}
MultilineCommentBegin = SP* '/' Quote
MultilineCommentEnd = Quote '/'
MultilineComment = MultilineCommentBegin vs:(!MultilineCommentEnd .)+ MultilineCommentEnd {
  return {
    type: 'comment',
    value: mapByIndex(vs, 1).join(''),
  };
}

// Member
Member = MemberMethod / MemberField

MemberMethod = klass:(!':' NotSpace)+ SP* ':' SP* &((!Newline !'(' .)* '(') name:NotNewline+ {
  return {
    type: 'class',
    name: mapByIndex(klass, 1).join(''),
    methods: [{ name: name.join('') }],
    fields: [],
    parents: [],
    interfaces: [],
  };
}

MemberField = klass:(!':' NotSpace)+ SP* ':' SP* name:NotNewline+ {
  return {
    type: 'class',
    name: mapByIndex(klass, 1).join(''),
    methods: [],
    fields: [{ name: name.join('') }],
    parents: [],
    interfaces: [],
  };
}

// Link
Link =
  SP*
  ln:Node
  lc:Cardinality?
  SP*
  lh:LeftHead?
  line:Line
  rh:RightHead?
  rc:Cardinality?
  SP*
  rn:Node
  label:LinkLabel?
{
  return {
    type: 'link',
    left: {
      node: ln,
      cardinality: lc,
      head: lh,
    },
    right: {
      node: rn,
      cardinality: rc,
      head: rh,
    },
    line: line,
    label: label,
  };
}
LinkLabel = SP* ':' SP* cs:NotNewline+ { return cs.join(''); }
Cardinality = SP+ str:DoubleQuotedString SP+ { return str; }
LeftHead = '<|' / '<' / '^' / '+' / 'o' / 'x' / '*' / '#';
RightHead = '|>' / '>' / '^' / '+' / 'o' / 'x' / '*' / '#';
LineDirection = 'left' / 'le' / 'l' / 'right' / 'ri' / 'r' / 'up' / 'u' / 'down' / 'do' / 'd'
SimpleLine = line:('-'+ / '.'+ / '='+) {
  return {
    char: line[0],
    length: line.length,
  };
}
LineWithDirection = left:('-'+ / '.'+ / '='+) dir:LineDirection right:('-'+ / '.'+ / '='+) {
  return {
    char: left[0],
    length: left.length + right.length,
    direction: dir,
  };
}
Line = LineWithDirection / SimpleLine

Node = AlphaNumericAscii+ {
  return { type: 'ident', value: text() };
}

// Class
Class = ClassWithBody / ClassWithoutBody

ClassType =
  'interface' /
  'enum' /
  'annotation' /
  ('abstract' SP+ 'class') { return 'abstract class'; } /
  'abstract' /
  'class' /
  'entity'

ClassName =
  cs:(!(SP / Newline / DoubleQuote / '{' / '}' / '<' / '>' / ',') .)+
  {
    return mapByIndex(cs, 1).join('');
  }

ClassNameList = head:ClassName tail:(SP* ',' SP* ClassName)* {
  return [head].concat(mapByIndex(tail, 3));
}

ClassNameAndDisplayName =
  display:DoubleQuotedString SP+ 'as' SP+ name:ClassName {
    return { name: name, display: display };
  } /
  name:ClassName SP+ 'as' SP+ display:DoubleQuotedString {
    return { name: name, display: display };
  } /
  name:DoubleQuotedString {
    return { name: name, display: name };
  } /
  name:ClassName {
    return { name: name, display: name };
  }

NotAngleBracket = c:(!'<' !'>' .) { return c[2]; }

ClassGenericPattern = c:NotAngleBracket cs:(NotAngleBracket / '<' ClassGenericPattern '>')* {
  return c + _.flatten(cs).join('');
}

ClassGeneric = SP* '<' p:ClassGenericPattern '>' {
  return p;
}

ClassStereoType = SP* '<<' cs:(!'>>' .)+ '>>' {
  return mapByIndex(cs, 1).join('');
}

ClassExtends = SP+ 'extends' SP+ klassList:ClassNameList {
  return klassList;
}

ClassImplements = SP+ 'implements' SP+ klassList:ClassNameList {
  return klassList;
}

ClassLineColor = SP* '##' style:('[' ('dotted' / 'dashed' / 'bold') ']')? color:NotSpace+ {
  return {
    style: style ? style[1] : null,
    color: color.join(''),
  };
}

ClassColor = SP* '#' color:NotSpace+ {
  return {
    name: color.join(''),
  };
}

ClassWithoutBody =
  type:ClassType
  SP+ klass:ClassNameAndDisplayName
  generic:ClassGeneric?
  stereoType:ClassStereoType?
  color:ClassColor?
  lineColor:ClassLineColor?
  parents:ClassExtends?
  interfaces:ClassImplements?
  {
    return {
      type: 'class',
      subtype: type,
      name: klass.name,
      methods: [],
      fields: [],
      generic: generic,
      stereoType: stereoType,
      color: color,
      lineColor: lineColor,
      parents: parents || [],
      interfaces: interfaces || [],
    };
  }

ClassMember = ClassMemberMethod / ClassMemberField

ClassMemberMethod = SP* &((!Newline !'(' .)* '(') name:NotNewline+ {
  return {
    type: 'method',
    name: name.join(''),
  };
}

ClassMemberField = SP* name:NotNewline+ {
  return {
    type: 'field',
    name: name.join(''),
  };
}

ClassWithBody =
  type:ClassType
  SP+ klass:ClassNameAndDisplayName
  generic:ClassGeneric?
  stereoType:ClassStereoType?
  color:ClassColor?
  lineColor:ClassLineColor?
  parents:ClassExtends?
  interfaces:ClassImplements?
  SP* '{' SP* Blanklines
  members:(!(SP* '}') ClassMember Blanklines )*
  SP* '}'
{
  var mems = mapByIndex(members, 1);
  var fields = mems
      .filter(function (m) { return m.type === 'field'})
      .map(function (m) { return { name: m.name }; });
  var methods = mems
      .filter(function (m) { return m.type === 'method' })
      .map(function (m) { return { name: m.name }; });

  return {
    type: 'class',
    subtype: type,
    name: klass.name,
    methods: methods,
    fields: fields,
    generic: generic,
    stereoType: stereoType,
    color: color,
    lineColor: lineColor,
    parents: parents || [],
    interfaces: interfaces || [],
  };
}
