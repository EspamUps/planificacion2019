//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace GestionPOA.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class TipoDependencia
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public TipoDependencia()
        {
            this.MetasDepartamento = new HashSet<MetasDepartamento>();
            this.ObjeEspecificosDepartamento = new HashSet<ObjeEspecificosDepartamento>();
            this.Planificacion = new HashSet<Planificacion>();
        }
    
        public int id { get; set; }
        public int Identificador { get; set; }
        public string Descripcion { get; set; }
        public bool Eliminado { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MetasDepartamento> MetasDepartamento { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ObjeEspecificosDepartamento> ObjeEspecificosDepartamento { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Planificacion> Planificacion { get; set; }
    }
}
