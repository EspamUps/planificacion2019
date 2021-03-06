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
    
    public partial class Metas
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Metas()
        {
            this.Acciones = new HashSet<Acciones>();
            this.InformacioAdicional = new HashSet<InformacioAdicional>();
            this.MetasDepartamento = new HashSet<MetasDepartamento>();
            this.Presupuesto = new HashSet<Presupuesto>();
            this.Programacion = new HashSet<Programacion>();
        }
    
        public int id { get; set; }
        public Nullable<int> IndicadorId { get; set; }
        public string Observacion { get; set; }
        public string Descripcion { get; set; }
        public Nullable<int> tipoCalificacionId { get; set; }
        public Nullable<bool> eliminado { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Acciones> Acciones { get; set; }
        public virtual Indicadores Indicadores { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<InformacioAdicional> InformacioAdicional { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MetasDepartamento> MetasDepartamento { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Presupuesto> Presupuesto { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Programacion> Programacion { get; set; }
        public virtual TipoCalificacion TipoCalificacion { get; set; }
    }
}
