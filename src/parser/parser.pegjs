// PlantUML Parser
{
  function mapByIndex(seq, index) {
    return seq.map(function (v) { return v[index]; });
  };
}

Main = Header diagram:Diagram Footer { return diagram; } / Diagram

// Common
EOF = !. { return ''; }
SP = ' ' / '\t'
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
Element = Emptyline* e:(Title / Caption / Comment / Member / Link) Blanklines? { return e; }

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

MemberMethod = klass:AlphaNumericAscii+ SP* ':' SP* &((!Newline !'(' .)* '(') name:NotNewline+ {
  return {
    type: 'class',
    name: klass.join(''),
    methods: [{ name: name.join('') }],
    fields: [],
  };
}

MemberField = klass:AlphaNumericAscii+ SP* ':' SP* name:NotNewline+ {
  return {
    type: 'class',
    name: klass.join(''),
    methods: [],
    fields: [{ name: name.join('') }],
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
      cardinality: lc || undefined,
      head: lh || undefined,
    },
    right: {
      node: rn,
      cardinality: rc || undefined,
      head: rh || undefined,
    },
    line: line,
    label: label || undefined,
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
