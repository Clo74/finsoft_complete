package business;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import entity.FlussoVersione;

@Stateless
public class FlussoVersioneStore {

	@PersistenceContext(name = "gestioneflussi")
	EntityManager em;
	
    private Integer id;
    
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	@Produces(MediaType.APPLICATION_JSON)
    public List<FlussoVersione> findAll() {
        return em.createNamedQuery("FlussoVersione.findAll", FlussoVersione.class)
        		.getResultList();
    }	

    public List<FlussoVersione> findAllPag(Integer start, Integer qtaRec) {
        return em.createNamedQuery("FlussoVersione.findAll", FlussoVersione.class)
        		.setFirstResult(start)
        		.setMaxResults(qtaRec)
        		.getResultList();
    }	
	
	@Produces(MediaType.APPLICATION_JSON)
    public List<FlussoVersione> findByTab(Integer searchIdFlus) {
        return em.createNamedQuery("FlussoVersione.findByFlus", FlussoVersione.class)
        		.setParameter("idFlus",searchIdFlus + "%")
        		.getResultList();
    }	
	
	@Produces(MediaType.APPLICATION_JSON)
    public FlussoVersione findId(Integer id) {
		 return em.find(FlussoVersione.class, id);
                
    }

	@Produces(MediaType.APPLICATION_JSON)
    public FlussoVersione save(FlussoVersione c){
        return em.merge(c);
    }
    
    public void remove(Integer id){
        em.remove(findId(id));
    }		
	
	
}
