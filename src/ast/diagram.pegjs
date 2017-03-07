{
}

Start = Header d:Diagram Footer { return d; } / Diagram

Header = BlankLine* Sp '@startuml' BlankLine
Footer = Sp '@enduml' BlankLine+

// Common
Eof = !.
Spacechar = ' ' / '\t'
Newline = '\n' / '\r' '\n'?
Nonspacechar = !Spacechar !Newline c:. { return c; }
Nonnewlinechar = !Newline c:. { return c; }
Sp = Spacechar*
Space = Spacechar+
BlankLine = Sp Newline

Diagram = es:Entity* BlankLine* {
  return { type: 'diagram', children: es };
}

Entity = BlankLine* e:(Title) { return e; }
Title = 'title' (Sp ':' Sp / Space) &(Sp Nonspacechar) cs:Nonnewlinechar+ {
  return { type: 'title', value: cs.join('') };
}
