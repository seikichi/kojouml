{
  function mapByIndex(seq, index) {
    return seq.map(function (v) { return v[index]; });
  };
}

Start = Header d:Diagram Footer { return d; } / Diagram

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

Header = Emptyline* SP* '@startuml' Emptyline
Footer = SP* '@enduml' Blanklines?
Diagram = es:Entity* Blanklines? {
  return { type: 'diagram', children: es };
}

Entity = Emptyline* e:(Title / Caption) { return e; }

Title = MultilineTitle / SinglelineTitle
SinglelineTitle = 'title' (SP* ':' SP* / SP+) &(SP* NotSpace) cs:NotNewline+ {
  return { type: 'title', value: cs.join('').replace('\\n', '\n') };
}
MultilineTitleBegin = 'title' Emptyline
MultilineTitleEnd = 'end' SP+ 'title' Emptyline
MultilineTitle = MultilineTitleBegin vs:(!MultilineTitleEnd Rawline)+ MultilineTitleEnd {
  return {
    type: 'title',
    value: mapByIndex(vs, 1).join('').replace('\\n', '\n'),
  };
}

Caption = 'caption' (SP* ':' SP* / SP+) &(SP* NotSpace) cs:NotNewline+ {
  return { type: 'caption', value: cs.join('').replace('\\n', '\n') };
}
